import { defineQuery } from "next-sanity";

export const STARTUP_QUERY =
  defineQuery(`*[_type=="startup" && defined(slug.current) && !defined($search)|| title match $search || category match $search || author->name match $search ]| order(_created_at){
  description,
    title,
    _createdAt,
    author -> {
      _id, name, image,bio
    },
    category,_id,
    slug,
    views,
    image
}`);

export const STARTUPS_BY_AUTHOT_QUERY =
  defineQuery(`*[_type=="startup" && author._ref ==$id]| order(_created_at){
  description,
    title,
    _createdAt,
    author -> {
      _id, name, image,bio
    },
    category,_id,
    slug,
    views,
    image
}`);

export const STARTUP_BY_ID_QUERY =
  defineQuery(`*[_type=="startup" && defined(slug.current) && _id==$id][0] {
  description,
    title,
    _createdAt,
    author -> {
      _id, name,username, image,bio
    },
    category,_id,
    slug,
    views,
    image,
    pitch
}`);

export const STARTUP_COUNT_QUERY =
  defineQuery(`*[_type=="startup" && defined(slug.current) && _id==$id][0] {
  views, _id
}`);

export const AUTHOR_BY_GITHUB_ID_QUERY =
  defineQuery(`*[_type=="author" && id==$id][0] {
    id, _id, bio, image, name, username, email,
  }`);

export const AUTHOR_BY_ID_QUERY =
  defineQuery(`*[_type=="author" && _id==$id][0] {
    id, _id, bio, image, name, username, email,
  }`);

export const PLAYLIST_BY_SLUG_QUERY = defineQuery(`
  *[_type=="playlist" && defined(slug.current) && slug.current==$slug][0]{
    id, title, slug, 
    select[] -> 
      {
        _id,
        _created_at, 
        slug,
        description,
        title,
        author -> {
          _id, name,slug, image,bio
        },
        category,
        views,
        image,
        pitch 
      }
  }`);
