"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var formio_service_1 = require('./formio.service');
var formio_common_1 = require('./formio.common');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var FormioWizardComponent = (function () {
    function FormioWizardComponent(elementRef) {
        this.elementRef = elementRef;
        this.formGroup = new forms_1.FormGroup({});
        this.events = new formio_common_1.FormioEvents();
        this.ready = new BehaviorSubject_1.BehaviorSubject(false);
        this.pages = [];
        this.storage = {};
        this.margin = 0;
        this.form = null;
        this.submission = {};
        this.change = new core_1.EventEmitter();
    }
    FormioWizardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentPage = 0;
        this.page = this.form.components[0];
        this.storage['page'] = 0;
        this.storage['data'] = {};
        this.form.components.forEach(function (item) {
            _this.pages.push(item);
        });
        if (this.src) {
            this.localStorageKey = this.src.split('/')[3];
            this.service = new formio_service_1.FormioService(this.src);
            this.pages.splice(this.pages.length - 1, 1);
        }
        else {
            this.localStorageKey = 'form_wizard';
        }
        this.updatePages();
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.storage));
    };
    FormioWizardComponent.prototype.onChange = function (event) {
        this.storage['data'] = event;
    };
    FormioWizardComponent.prototype.checkErrors = function () {
        //@TODO:Check Validations...
        return false;
    };
    FormioWizardComponent.prototype.next = function () {
        if (this.checkErrors()) {
            return;
        }
        if (this.currentPage >= (this.pages.length - 1)) {
            return;
        }
        this.currentPage++;
        this.page = this.pages[this.currentPage];
        this.storage['page'] = this.pages.indexOf(this.page) + 1;
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.storage));
    };
    FormioWizardComponent.prototype.prev = function () {
        if (this.currentPage < 1) {
            return;
        }
        this.currentPage--;
        this.page = this.pages[this.currentPage];
        this.storage['page'] = this.pages.indexOf(this.page);
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.storage));
        this.submission.data = this.storage['data'];
    };
    FormioWizardComponent.prototype.onSubmitWizard = function () {
        if (this.checkErrors()) {
            return;
        }
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.storage));
        var submission = { data: JSON.parse(localStorage.getItem(this.localStorageKey)).data };
        if (this.service) {
            this.service.saveSubmission(submission).subscribe(function (sub) { });
            localStorage.setItem(this.localStorageKey, '');
        }
    };
    FormioWizardComponent.prototype.goto = function (index) {
        if (index < 0) {
            return;
        }
        if (index >= this.pages.length) {
            return;
        }
        this.currentPage = index;
        this.page = this.pages[this.currentPage];
    };
    FormioWizardComponent.prototype.updatePages = function () {
        if (this.pages.length > 6) {
            this.margin = ((1 - (this.pages.length * 0.0833333333)) / 2) * 100;
            this.colClass = 'col-sm-1';
        }
        else {
            this.margin = ((1 - (this.pages.length * 0.1666666667)) / 2) * 100;
            this.colClass = 'col-sm-2';
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FormioWizardComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FormioWizardComponent.prototype, "form", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FormioWizardComponent.prototype, "submission", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FormioWizardComponent.prototype, "src", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', formio_service_1.FormioService)
    ], FormioWizardComponent.prototype, "service", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FormioWizardComponent.prototype, "change", void 0);
    FormioWizardComponent = __decorate([
        core_1.Component({
            selector: 'formio-wizard',
            template: '<div></div>'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], FormioWizardComponent);
    return FormioWizardComponent;
}());
exports.FormioWizardComponent = FormioWizardComponent;
