import Vue from 'vue'
import { sayHi } from "./util";

sayHi();

let comp = Vue.extend( {
    template: `<div>
                <input v-bind:value="value" v-on:input="doEmit($event.target.value)" />
              </div>`,
    props: {
        value: ''
    },  
    computed : {
       test : function(){
           return "test";
       } 
    } ,      
    methods: {
        doEmit: function (val : any) {
            this.$emit('input', val);
        }
    }
});

Vue.component('my-component',comp);

// create a root instance
let app = new Vue({
    el: '#example',
    template : `
        <div>
            <my-component v-model="person.name"></my-component> 
            <my-component v-model="person.age"></my-component> 
            <br>{{fullName}}
            <button @click="person.name = 'dogy'">Reset</button>
        </div>            
    `,
    data: {
        person: {
            name: "dogby",
            age : 33
        }
    },
    computed : {
        fullName : function(): string{
            return `${this.person.name}, ${this.person.age}`;
        }
    },            
    methods: {
        log: function (val : any) {
            console.log('logging', val);
        }
    }

});

