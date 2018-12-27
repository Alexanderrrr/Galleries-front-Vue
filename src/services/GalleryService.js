import HttpService from './HttpService.js'

export class GalleryService {

  getAll(){
    return HttpService.get('galleries')
    .then(({data}) => data);
  }
  create({name, description, images}){
    return HttpService.post('galleries', {
      name,
      description,
      images
    })
  }

}

const galleryService = new GalleryService();
export default galleryService;
