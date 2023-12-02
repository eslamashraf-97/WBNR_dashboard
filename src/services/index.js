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
		  return api().post(`admin/upload/image`, file , config)
	  },
	  getNotification (page = 1) {
		  return api().get(`admin/notifications?page=${page}`)
	  },
		getNotificationUnread (page = 1) {
		  return api().get(`admin/notifications/unread-length`)
	  },
	  changeItemStatus (id) {
		  return api().patch(`admin/notifications/mark-as-read/${id}`)
	  }
  };
