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

  authorsGalleries(id){
    return HttpService.get(`authors/${id}`)
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

}

const galleryService = new GalleryService();
export default galleryService;
