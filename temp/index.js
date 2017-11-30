"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
vue_1.default.component('child-component', {
    // this does work, because we are in the right scope
    template: '<div v-show="show">Child {{show}}</div>',
    props: {
        show: false
    }
});
let mycomp = vue_1.default.extend({
    template: `<div>
                <input v-bind:value="value" v-on:input="doEmit($event.target.value)" />
              </div>`,
    props: {
        value: ''
    },
    computed: {
        test: function () {
            return "test";
        }
    },
    methods: {
        doEmit: function (val) {
            this.$emit('input', val);
        }
    }
});
vue_1.default.component('my-component', mycomp);
// create a root instance
let app = new vue_1.default({
    el: '#example',
    template: `
        <div>
            <my-component v-model="person.name"></my-component> 
            <my-component v-model="person.age"></my-component> 
            <br>{{fullName}}
            <button @click="person.name = 'dogy'">Reset</button><br>
            <child-component :show="show"></child-component> <input type="checkbox" v-model="show"/> {{show}}
        </div>            
    `,
    data: {
        person: {
            name: "dogby",
            age: 33
        },
        show: false
    },
    computed: {
        fullName: function () {
            return `${this.person.name}, ${this.person.age}`;
        }
    },
    methods: {
        log: function (val) {
            console.log('logging', val);
        }
    }
});
