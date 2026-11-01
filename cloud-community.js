window.CloudCommunity = {
  getRatings: async function(songIds){
    var client=window.supabaseClient;
    var ids=Array.from(new Set((songIds||[]).map(String)));
    if(!ids.length) return {};
    var result=await client.from('calificaciones').select('cancion_id,user_id,estrellas').in('cancion_id',ids);
    if(result.error) throw result.error;
    var auth=await client.auth.getUser();
    var uid=auth.data&&auth.data.user?auth.data.user.id:null;
    var grouped={};
    ids.forEach(function(id){grouped[id]=[];});
    (result.data||[]).forEach(function(row){(grouped[String(row.cancion_id)]||(grouped[String(row.cancion_id)]=[])).push(row);});
    var out={};
    Object.keys(grouped).forEach(function(id){
      var rows=grouped[id], total=rows.reduce(function(sum,row){return sum+Number(row.estrellas);},0);
      var mine=rows.find(function(row){return row.user_id===uid;});
      out[id]={promedio:rows.length?(total/rows.length).toFixed(1):'0.0',votos:rows.length,miCalificacion:mine?Number(mine.estrellas):0};
    });
    return out;
  },
  getRating: async function(songId){
    var all=await this.getRatings([songId]);
    return all[String(songId)]||{promedio:'0.0',votos:0,miCalificacion:0};
  },
  rate: async function(songId,stars){
    var client=window.supabaseClient, auth=await client.auth.getUser();
    if(auth.error||!auth.data.user) throw new Error('Inicia sesión para calificar.');
    var r=await client.from('calificaciones').upsert({cancion_id:songId,user_id:auth.data.user.id,estrellas:stars},{onConflict:'cancion_id,user_id'});
    if(r.error) throw r.error; return true;
  },
  getComments: async function(songId){
    var r=await window.supabaseClient.from('comentarios').select('id,usuario,contenido,created_at').eq('cancion_id',songId).order('created_at',{ascending:true});
    if(r.error) throw r.error; return r.data||[];
  },
  comment: async function(songId,text){
    var client=window.supabaseClient, auth=await client.auth.getUser();
    if(auth.error||!auth.data.user) throw new Error('Inicia sesión para comentar.');
    var user=auth.data.user.user_metadata.username||'Usuario';
    var r=await client.from('comentarios').insert({cancion_id:songId,user_id:auth.data.user.id,usuario:user,contenido:text});
    if(r.error) throw r.error; return true;
  }
};
