import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Dashboard from "@/views/Dashboard.vue";
import NotFound from "@/views/NotFound.vue";
import SigninView from '@/views/Authentication/SigninView.vue'
import SignupView from '@/views/Authentication/SignupView.vue'
import ECommerceView from '@/views/Dashboard/ECommerceView.vue'
import ProfileView from '@/views/ProfileView.vue'
import UploadFileView from "@/views/Files/UploadFileView.vue"
import FileView from "@/views/Files/FileView.vue";
import CommunityListView from "@/views/Community/CommunityListView.vue";
import CommunityDetailsView from "@/views/Community/CommunityDetailsView.vue";
import CreateCommunityView from "@/views/Community/CreateCommunityView.vue";
import CommunityMembersListView from "@/views/Community/CommunityMembersListView.vue";
import CommunitySettingView from "@/views/Community/Settings/CommunitySettingView.vue";
import CommunityRequestListView from "@/views/Community/Settings/CommunityRequestListView.vue";

export const routes = [

    {
        path: '/app',
        name: 'app',
        component: Dashboard,
        redirect: '/app/dashboard', // Add the redirect property

        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: 'dashboard',
                name: 'eCommerce',
                component: ECommerceView,
           
            },
            {
                path: 'communities/create-community',
                name: 'createCommunity',
                component: CreateCommunityView,
            },
            {
                path: 'communities/:id/settings',
                name: 'communitySettings',
                component: CommunitySettingView,
         
            },
            {
                path: 'communities',
                name: 'viewCommunities',
                component: CommunityListView,
     
            },
            {
                path: 'communities/:id/details',
                name: 'communityDetails',
                component: CommunityDetailsView,
        
            },
            {
                path: 'communities/:id/members',
                name: 'communityMembers',
                component: CommunityMembersListView,
          
            },
            {
                path: 'communities/:id/requests',
                name: 'communityRequests',
                component: CommunityRequestListView,
            },
            {
                path: 'files/upload-file',
                name: 'uplaodFiles',
                component: UploadFileView,
           
            },
            {
                path: 'files',
                name: 'viewFiles',
                component: FileView,
      
            },
            {
                path: 'profile',
                name: 'profile',
                component: ProfileView,
            },


        ]
    },
    {
        path: '/login',
        name: "login",
        meta: {
            requireGuest: true,
        },
        component: SigninView,
    },
    {
        path: '/register',
        name: "register",
        meta: {
            requireGuest: true,
        },
        component: SignupView
    },
    
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
]