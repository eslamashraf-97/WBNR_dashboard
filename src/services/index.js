  import { api } from '@/axios';
  export default {
	  listDataTabl (url, filter) {
		  return api().get(url, {
			  params: filter
		  })
	  },
	  removeData (url, rowId, additonalUrl, method = 'delete') {
		  return api()[method](`${url}/${rowId}/${additonalUrl ? additonalUrl : ''}`)
	  },
	  uploadImage (file, config = {}) {
		  return api().post(`admin/upload/product-images`, file , config)
	  },
  };
