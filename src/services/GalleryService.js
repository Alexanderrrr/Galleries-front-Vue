import HttpService from './HttpService.js'

export class GalleryService {

  getAll(term='', page=1){
    return HttpService.get('galleries', {
      params: {
        term,
        page
      }
    })
    .then(({data}) => {
      return data
    });
  }

  show(id){
    return HttpService.get(`galleries/${id}`)
    .then(({data}) => data);
  }
  create({name, description, images}){
    return HttpService.post('galleries', {
      name,
      description,
      images
    })
  }

  authorsGalleries(id,term='', page=1){
    return HttpService.get(`authors-galleries/${id}`, {
      params: {
        id,
        term,
        page
      }
    })
    .then( ({data}) => data);
  }

  myGalleries(term='', page=1){
    return HttpService.get('my-galleries', {
      params: {
        term,
        page
      }
    })
    .then(({data}) => data)
  }

  edit({name, description, images}, id){
    return HttpService.put(`galleries/${id}`, {
      name,
      description,
      images
    })
  }

  deleteGallery(id){
    return HttpService.delete(`gallery/${id}`)
  }

  addComment({content,id}){
    return HttpService.post(`my-galleries/${id}`, {
        content
    })
    .then(({data}) => data)
  }

  deleteComment (id) {
    return HttpService.delete(`comment/${id}`)
  }

}

const galleryService = new GalleryService();
export default galleryService;
