"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const util_1 = require("./util");
util_1.sayHi();
let comp = vue_1.default.extend({
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
vue_1.default.component('my-component', comp);
// create a root instance
let app = new vue_1.default({
    el: '#example',
    data: {
        person: {
            name: "dogby",
            age: 33
        }
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
