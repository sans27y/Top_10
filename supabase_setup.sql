-- Ejecuta este script en Supabase > SQL Editor.
-- Mantiene públicas las lecturas y exige sesión para publicar.

create table if not exists public.canciones_publicadas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  titulo text not null,
  videojuego text not null,
  compositor text not null,
  subida_por text,
  audio_path text not null,
  cover_path text,
  created_at timestamptz not null default now()
);

alter table public.canciones_publicadas add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table public.canciones_publicadas add column if not exists titulo text;
alter table public.canciones_publicadas add column if not exists videojuego text;
alter table public.canciones_publicadas add column if not exists compositor text;
alter table public.canciones_publicadas add column if not exists audio_path text;
alter table public.canciones_publicadas add column if not exists created_at timestamptz not null default now();

alter table public.canciones_publicadas add column if not exists subida_por text;
alter table public.canciones_publicadas add column if not exists cover_path text;

create table if not exists public.calificaciones (
  id uuid primary key default gen_random_uuid(),
  cancion_id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  estrellas integer not null check (estrellas between 1 and 5),
  created_at timestamptz not null default now(),
  unique (cancion_id, user_id)
);

create table if not exists public.comentarios (
  id uuid primary key default gen_random_uuid(),
  cancion_id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  usuario text not null,
  contenido text not null check (char_length(contenido) between 1 and 500),
  created_at timestamptz not null default now()
);

alter table public.calificaciones enable row level security;
alter table public.comentarios enable row level security;

drop policy if exists "Lectura publica de calificaciones" on public.calificaciones;
create policy "Lectura publica de calificaciones" on public.calificaciones for select to anon, authenticated using (true);
drop policy if exists "Usuarios califican con su cuenta" on public.calificaciones;
create policy "Usuarios califican con su cuenta" on public.calificaciones for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "Usuarios actualizan su calificacion" on public.calificaciones;
create policy "Usuarios actualizan su calificacion" on public.calificaciones for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Lectura publica de comentarios" on public.comentarios;
create policy "Lectura publica de comentarios" on public.comentarios for select to anon, authenticated using (true);
drop policy if exists "Usuarios comentan con su cuenta" on public.comentarios;
create policy "Usuarios comentan con su cuenta" on public.comentarios for insert to authenticated with check (auth.uid() = user_id);

grant select on public.canciones_publicadas to anon, authenticated;
grant insert on public.canciones_publicadas to authenticated;
grant select on public.calificaciones to anon, authenticated;
grant insert, update on public.calificaciones to authenticated;
grant select on public.comentarios to anon, authenticated;
grant insert on public.comentarios to authenticated;

-- Corrige la política de subida: Storage asigna el propietario al crear el objeto.
drop policy if exists "Subida autenticada de MP3" on storage.objects;
create policy "Subida autenticada de MP3" on storage.objects for insert to authenticated
with check (bucket_id = 'canciones' and lower(storage.extension(name)) = 'mp3'
  and (storage.foldername(name))[1] = auth.uid()::text);

-- Límite de 3 MB para audio y portadas.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('canciones', 'canciones', true, 3145728, array['audio/mpeg'])
on conflict (id) do update set public = true, file_size_limit = 3145728,
  allowed_mime_types = array['audio/mpeg'];

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portadas', 'portadas', true, 3145728, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 3145728,
  allowed_mime_types = array['image/jpeg','image/png','image/webp'];

drop policy if exists "Lectura publica de portadas" on storage.objects;
create policy "Lectura publica de portadas" on storage.objects for select to anon, authenticated
using (bucket_id = 'portadas');
drop policy if exists "Usuarios autenticados suben portadas" on storage.objects;
create policy "Usuarios autenticados suben portadas" on storage.objects for insert to authenticated
with check (bucket_id = 'portadas' and lower(storage.extension(name)) in ('jpg','jpeg','png','webp')
  and (storage.foldername(name))[1] = auth.uid()::text);

create index if not exists idx_calificaciones_cancion_id on public.calificaciones(cancion_id);
create index if not exists idx_comentarios_cancion_created on public.comentarios(cancion_id, created_at);
