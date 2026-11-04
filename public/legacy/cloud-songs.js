window.CloudSongs = {
  upload: async function(meta, file, coverFile){
    var client=window.supabaseClient;
    if(!client) throw new Error('Supabase no está configurado.');
    var auth=await client.auth.getUser();
    if(auth.error||!auth.data.user) throw new Error('Debes iniciar sesión para subir canciones.');
    if(!coverFile) throw new Error('Debes seleccionar una imagen de portada.');
    var user=auth.data.user;
    var id=crypto.randomUUID();
    var path=user.id+'/'+id+'.mp3';
    var coverPath=user.id+'/'+id+'-'+coverFile.name.replace(/[^a-zA-Z0-9._-]/g,'_');
    var up=await client.storage.from('canciones').upload(path,file,{contentType:'audio/mpeg',upsert:false});
    if(up.error) throw up.error;
    var coverUp=await client.storage.from('portadas').upload(coverPath,coverFile,{contentType:coverFile.type,upsert:false});
    if(coverUp.error){await client.storage.from('canciones').remove([path]);throw coverUp.error;}
    var row={user_id:user.id,titulo:meta.titulo,videojuego:meta.videojuego,compositor:meta.compositor,
      subida_por:meta.subidaPor||user.user_metadata.username||'Usuario',audio_path:path,cover_path:coverPath};
    var ins=await client.from('canciones_publicadas').insert(row);
    if(ins.error){await client.storage.from('canciones').remove([path]);await client.storage.from('portadas').remove([coverPath]);throw ins.error;}
    return true;
  },
  list: async function(){
    var r=await window.supabaseClient.from('canciones_publicadas')
      .select('id,titulo,videojuego,compositor,subida_por,audio_path,cover_path,created_at')
      .order('created_at',{ascending:false});
    if(r.error) throw r.error;
    return (r.data||[]).map(function(s){
      var audio=window.supabaseClient.storage.from('canciones').getPublicUrl(s.audio_path).data.publicUrl;
      var cover=s.cover_path?window.supabaseClient.storage.from('portadas').getPublicUrl(s.cover_path).data.publicUrl:'';
      return Object.assign({},s,{audio_url:audio,cover_url:cover});
    });
  }
};
