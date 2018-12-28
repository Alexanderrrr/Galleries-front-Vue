import HttpService from './HttpService.js'

export class GalleryService {

  getAll(page){
    return HttpService.get('galleries', {
      params: {

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

}

const galleryService = new GalleryService();
export default galleryService;
