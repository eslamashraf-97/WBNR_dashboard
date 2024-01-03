import index from './pages/index.vue';
import deliveryNotes from './pages/deliveryNotes.vue';
import socialMediaLinks from './pages/socialMediaLinks.vue';

export default [{
    name: 'testimonials',
    path: '/testimonials',
    component: index
},
    {
    name: 'deliveryNotes',
    path: '/delivery-notes',
    component: deliveryNotes
},
    {
        name: 'socialMediaLinks',
        path: '/social-media',
        component: socialMediaLinks
    }
]
