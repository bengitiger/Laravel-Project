import Vue from 'vue';
import * as api from './../../config';
import * as types from './../../mutation-types';

export default 
{ state: {  tickettypetable: null,  
            showTypeCrudPopup: false,  typeData: null,showTypeCrudPopup1: false,csType1perTicket:false,
             //modalForm: {  state: null, }, 
             csticketType1data:null,showFormType1:false,
         },
getters: {    tickettypetablegetter: state => state.tickettypetable },
mutations: 
 {

    [types.GET_TICKET_TYPE_TABLE] (state, payload) //-----this is for refresh
    {  console.log('new2.js-types.GET_TICKET_TYPE_TABLE payload=', payload.tickettypetable);
       console.log('new2.js-types.GET_TICKET_TYPE_TABLE state=', state);
       state.tickettypetable = payload.tickettypetable;
    },

        //---------------diplay table working above-----------now add below
    [types.SET_TYPE_SHOW_POPUP] (state, payload) //--------add----3--//----edit--5
        {   console.log('csticket-type.js---types.SET_TYPE_SHOW_POPUP payload=', payload.data);
            console.log('csticket-type.js---types.SET_TYPE_SHOW_POPUP state=', state);
            state.showTypeCrudPopup = payload.data.isShow;  state.typeData = payload.data.data; //data could be add or edit
        }, 
 
    [types.ADD_TICKET_TYPE_SUCCESS] (state, payload) {console.log('cstickettype.js-types.ADD_TICKET_TYPE_SUCCESS payload=', payload); },
    [types.ADD_TICKET_TYPE_FAILURE] (state, payload) {console.log('cstickettype.js-types.ADD_TICKET_TYPE_FAILURE payload=', payload); },
    [types.ADD_TICKET_TYPE1_SUCCESS] (state, payload) {console.log('cstickettype.js-types.ADD_TICKET_TYPE1_SUCCESS payload=', payload); },
    [types.ADD_TICKET_TYPE1_FAILURE] (state, payload) {console.log('cstickettype.js-types.ADD_TICKET_TYPE1_FAILURE payload=', payload); },
    [types.UPDATE_TICKET_TYPE_SUCCESS] (state, payload) {console.log('csticketstatus.js-types.UPDATE_TICKET_TYPE_SUCCESS payload=', payload); },
    [types.UPDATE_TICKET_TYPE_FAILURE] (state, payload) {console.log('csticketstatus.js-types.UPDATE_TICKET_TYPE_FAILURE payload=', payload); },
    [types.DELETE_TICKET_TYPE_SUCCESS] (state, payload) {console.log('csticketstatus.js-types.DELETE_TICKET_TYPE_SUCCESS payload=', payload); },
    [types.DELETE_TICKET_TYPE_FAILURE] (state, payload) {console.log('csticketstatus.js-types.DELETE_TICKET_TYPE_FAILURE payload=', payload); },
    [types.DELETE_TICKET_TYPE1_SUCCESS] (state, payload) {console.log('csticketstatus.js-types.DELETE_TICKET_TYPE1_SUCCESS payload=', payload); },
    [types.DELETE_TICKET_TYPE1_FAILURE] (state, payload) {console.log('csticketstatus.js-types.DELETE_TICKET_TYPE1_FAILURE payload=', payload); },

    //--------------------------ticket type crud----
    [types.SET_CSTICKETTYPE1_SHOW_MODAL] (state, payload) 
    {   console.log('/store/cstickettype.js-SET_CSTICKETTYPE1_SHOW_MODAL payload=', payload.data);
        console.log('/store/cstickettype.js-SET_CSTICKETTYPE1_SHOW_MODAL state=', state);
        state.showFormType1 = payload.data.isShow;
        state.csticketType1data = payload.data.data;
       
       // state.showTypeCrudPopup1 = payload.data.isShow; 
    },
    [types.GET_TICKET_TYPE1_TABLE] (state, payload) //-----this is for refresh
    {  console.log('csticket-type.js-types.GET_TICKET_TYPE1_TABLE payload=', payload.csType1perTicket);
       console.log('csticket-type.js-types.GET_TICKET_TYPE1_TABLE state=', state);
       state.csType1perTicket = payload.csType1perTicket;  //---state takes it from here--gives to getter
                                                    //then getter takes it and gives it back to vue file
    },

    //----------------------------

    },

    actions: 
    {  gettickettypetable: ({commit, dispatch}) => //---------for displaying all the records
         {  return new Promise((resolve, reject) => 
           {  Vue.http.get(api.gettickettypetableapi)
                   .then(response => {   console.log('csticket-type.js-gettickettypetable response.body=', response.body);                      
                              //  commit({type: types.GET_TICKET_TYPE_TABLE, tickettypetable: response.body.gett1 });  
                                commit({type: types.GET_TICKET_TYPE_TABLE, tickettypetable: response.body });
                                resolve(response);
                     }) 
                   .catch(error => {  console.error('csticket-type.js--gettickettypetable  error =', error);  reject(error); });
           });
         },
         //----this one is only for popup first then data transaction bw vue file and store
        cstypeshowpopup: ({commit}, data) => //-for add/edit---//----add----2 //--edit 4
          {   commit({ type: types.SET_TYPE_SHOW_POPUP, data: data  }); //------update the data of table--with new modifications
              console.log('csticket-type.js--cstypeshowpopup data=', data); //---------------now the data is updated for table show
              //--------------------------this will update the value in mutation---and feed to the popup--blank form--ie null value
          },
           //-------add 10---      
         cstypeadd: ({dispatch}, formData) => 
           {  return new Promise((resolve, reject) => 
               {  console.log('csticket-type.js-- cstypeadd-- formData=', formData);
                  Vue.http.post(api.addcstype, formData)
                  .then(response => { dispatch('addtypeSuccess', response.body);  resolve();   })
                  .catch(response => { dispatch('addtypeFailure', response.body); reject();   });
         
               })
           },
         addtypeSuccess: ({commit, dispatch}, body) => 
             {   console.log('csticket-type.js---addtypeSuccess body=', body);
                 commit({   type: types.ADD_TICKET_TYPE_SUCCESS, state: body.state   });
                 dispatch('showSuccessNotification', 'TYPE has been added.');   
                 dispatch('gettickettypetable');
             },
         addtypeFailure: ({commit, dispatch}, body) => 
           {   commit({  type: types.ADD_TICKET_TYPE_FAILURE, errors: body  });
               console.error('csticket-type.js---addtypeFailure body.error=', body.error);
               if(body.error) {  dispatch('showErrorNotification', body.error);  }
           },
//---------------------------add finish---------------update start-----------

updatetype: ({dispatch}, formData) => 
 {  return new Promise((resolve, reject) => 
     {  console.log('csticket-type.js-- cstypeadd-- formData=', formData);
         Vue.http.post(api.updatetype, formData)
             .then(response => { dispatch('updateTypeSuccess', response.body);  resolve();   })
             .catch(response => { dispatch('updateTypeFailure', response.body); reject();   });
         
     })
 },
 updateTypeSuccess: ({commit, dispatch}, body) => 
 {   console.log('csticket-type.js---addtypeSuccess body=', body);
     commit({   type: types.UPDATE_TICKET_TYPE_SUCCESS, state: body.state   });
     dispatch('showSuccessNotification', 'TYPE has been updated.');   
     dispatch('gettickettypetable');
 },
 updateTypeFailure: ({commit, dispatch}, body) => 
 {   commit({  type: types.UPDATE_TICKET_TYPE_FAILURE, errors: body  });
     console.error('csticket-type.js---updateTypeFailure body.error=', body.error);
     if(body.error) {  dispatch('showErrorNotification', body.error);  }
 },
//--------------------update done-------------delete start----------------
        deletetype: ({dispatch}, formData) => 
            {   return new Promise((resolve, reject) => 
                {    Vue.http.post(api.deletetype, formData)
                 .then(response => {  dispatch('deletetypeSuccess', response.body); resolve(); })
                .catch(response => { dispatch('deletetypeFailure', response.body);  reject(); });
                })
            },
        deletetypeSuccess: ({commit, dispatch}, body) => 
            {   commit({ type: types.DELETE_TICKET_TYPE_SUCCESS, state: body.state });
                dispatch('showSuccessNotification', 'TYPE has been deleted.');
                dispatch('gettickettypetable');  //----get back new result with modified values
            },
        deletetypeFailure: ({commit, dispatch}, body) => 
            {   commit({   type: types.DELETE_TICKET_TYPE_FAILURE, errors: body  });
                if(body.error) {  dispatch('showErrorNotification', body.error);  }
            },

//------------------------ticket types-- type1 crud--------------------
        setCsTicketType1ShowModal:({commit,dispatch}, data) => 
            { commit({ type: types.SET_CSTICKETTYPE1_SHOW_MODAL, data: data });    
            // dispatch('getLastTicket');
            },
        cstype1add: ({dispatch}, formData) => 
           {  return new Promise((resolve, reject) => 
               {  console.log('csticket-type.js-- cstype1add-- formData=', formData);
                  Vue.http.post(api.addcstype1, formData)
                  .then(response => { dispatch('addtype1Success', response.body);  resolve();   })
                  .catch(response => { dispatch('addtype1Failure', response.body); reject();   });
         
               })
           },
        addtype1Success: ({commit, dispatch}, body) => 
             {   console.log('csticket-type.js---addtype1Success body=', body);
                 commit({   type: types.ADD_TICKET_TYPE1_SUCCESS, state: body.state   });
                 dispatch('showSuccessNotification', 'TYPE1 has been added.');   
                 dispatch('gettickettype1table',body.gett1);
                // dispatch('gettickettypetable');
             },
        addtype1Failure: ({commit, dispatch}, body) => 
           {   commit({  type: types.ADD_TICKET_TYPE1_FAILURE, errors: body  });
               console.error('csticket-type.js---addtype1Failure body.error=', body.error);
               if(body.error) {  dispatch('showErrorNotification', body.error);  }
           },

        gettickettype1table: ({commit, dispatch},dataItem) =>// 
           {  return new Promise((resolve, reject) => 
                {  //Vue.http.post(api.gettickettype1tableapi,dataItem)
                   Vue.http.post(api.gettickettype1tableapi1,dataItem)
                   .then(response => {    
                                commit({type: types.GET_TICKET_TYPE1_TABLE, csType1perTicket: response.body });
                                resolve(response);
                     }) 
                   .catch(error => {    reject(error); });
                });
           },
        deletetype1: ({dispatch}, formData) => 
            {   return new Promise((resolve, reject) => 
                {    Vue.http.post(api.deletetype1, formData)
                 .then(response => {  dispatch('deletetype1Success', response.body); resolve(); })
                .catch(response => { dispatch('deletetype1Failure', response.body);  reject(); });
                })
            },
        deletetype1Success: ({commit, dispatch}, body) => 
            {   commit({ type: types.DELETE_TICKET_TYPE1_SUCCESS, state: body });
                dispatch('showSuccessNotification', 'TYPE1 has been deleted.');
             
                dispatch('gettickettype1table',body.gett1);  //----get back new result with modified values
            },
        deletetype1Failure: ({commit, dispatch}, body) => 
            {   commit({   type: types.DELETE_TICKET_TYPE1_FAILURE, errors: body  });
                if(body.error) {  dispatch('showErrorNotification', body.error);  }
            },

    }//actions finished

}