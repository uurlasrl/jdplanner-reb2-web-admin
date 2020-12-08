import UurlaBEApiObject from '@/beapi/UurlaBEApiGeneral'


export default (context, inject) => {

  inject('uurlaBEApi', new UurlaBEApiObject(context.$config, context.store))
}
