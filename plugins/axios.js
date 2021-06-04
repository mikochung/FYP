import Vue from 'vue'
import {auth} from '~/services/firebase';

export default async ({ app }, inject) => {   
  inject('user', auth.currentUser)
}