/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';

import '@ionic/core';
import '@stencil/redux';
import 'ionicons';
import {
  EventEmitter,
} from '@stencil/core';


export namespace Components {

  interface AddressInput {
    'input': any;
    'label': string;
    'name': string;
  }
  interface AddressInputAttributes extends StencilHTMLAttributes {
    'input'?: any;
    'label'?: string;
    'name'?: string;
  }

  interface AppRoot {}
  interface AppRootAttributes extends StencilHTMLAttributes {}

  interface GenericCarousel {
    'action': any;
  }
  interface GenericCarouselAttributes extends StencilHTMLAttributes {
    'action'?: any;
  }

  interface AppDrawer {}
  interface AppDrawerAttributes extends StencilHTMLAttributes {}

  interface AppEntrance {}
  interface AppEntranceAttributes extends StencilHTMLAttributes {}

  interface PageAbout {}
  interface PageAboutAttributes extends StencilHTMLAttributes {}

  interface PageAccount {}
  interface PageAccountAttributes extends StencilHTMLAttributes {
    'onUserDidLogOut'?: (event: CustomEvent) => void;
  }

  interface PageCreate {}
  interface PageCreateAttributes extends StencilHTMLAttributes {}

  interface PageMap {}
  interface PageMapAttributes extends StencilHTMLAttributes {}

  interface PageOrders {}
  interface PageOrdersAttributes extends StencilHTMLAttributes {}

  interface PageScheduleFilter {
    'excludedTracks': string[];
  }
  interface PageScheduleFilterAttributes extends StencilHTMLAttributes {
    'excludedTracks'?: string[];
  }

  interface PageSchedule {}
  interface PageScheduleAttributes extends StencilHTMLAttributes {}

  interface PageSession {
    'goback': string;
    'sessionId': string;
  }
  interface PageSessionAttributes extends StencilHTMLAttributes {
    'goback'?: string;
    'sessionId'?: string;
  }

  interface PageSpeakerDetail {
    'speakerId': string;
  }
  interface PageSpeakerDetailAttributes extends StencilHTMLAttributes {
    'speakerId'?: string;
  }

  interface PageSpeakerList {}
  interface PageSpeakerListAttributes extends StencilHTMLAttributes {}

  interface PageSupport {}
  interface PageSupportAttributes extends StencilHTMLAttributes {}

  interface PageTabs {
    'role': any;
    'select': (tab: string) => Promise<void>;
  }
  interface PageTabsAttributes extends StencilHTMLAttributes {
    'role'?: any;
  }

  interface RegisterWizard {
    'action': any;
    'exit': any;
    'images': any;
  }
  interface RegisterWizardAttributes extends StencilHTMLAttributes {
    'action'?: any;
    'exit'?: any;
    'images'?: any;
  }

  interface ImageUploader {
    'reset': () => void;
    'send': any;
  }
  interface ImageUploaderAttributes extends StencilHTMLAttributes {
    'onOnUploadCompleted'?: (event: CustomEvent<Blob>) => void;
    'send'?: any;
  }

  interface GenericWizard {
    'action': any;
    'id': string;
    'images': any;
    'steps': number;
  }
  interface GenericWizardAttributes extends StencilHTMLAttributes {
    'action'?: any;
    'id'?: string;
    'images'?: any;
    'steps'?: number;
  }
}

declare global {
  interface StencilElementInterfaces {
    'AddressInput': Components.AddressInput;
    'AppRoot': Components.AppRoot;
    'GenericCarousel': Components.GenericCarousel;
    'AppDrawer': Components.AppDrawer;
    'AppEntrance': Components.AppEntrance;
    'PageAbout': Components.PageAbout;
    'PageAccount': Components.PageAccount;
    'PageCreate': Components.PageCreate;
    'PageMap': Components.PageMap;
    'PageOrders': Components.PageOrders;
    'PageScheduleFilter': Components.PageScheduleFilter;
    'PageSchedule': Components.PageSchedule;
    'PageSession': Components.PageSession;
    'PageSpeakerDetail': Components.PageSpeakerDetail;
    'PageSpeakerList': Components.PageSpeakerList;
    'PageSupport': Components.PageSupport;
    'PageTabs': Components.PageTabs;
    'RegisterWizard': Components.RegisterWizard;
    'ImageUploader': Components.ImageUploader;
    'GenericWizard': Components.GenericWizard;
  }

  interface StencilIntrinsicElements {
    'address-input': Components.AddressInputAttributes;
    'app-root': Components.AppRootAttributes;
    'generic-carousel': Components.GenericCarouselAttributes;
    'app-drawer': Components.AppDrawerAttributes;
    'app-entrance': Components.AppEntranceAttributes;
    'page-about': Components.PageAboutAttributes;
    'page-account': Components.PageAccountAttributes;
    'page-create': Components.PageCreateAttributes;
    'page-map': Components.PageMapAttributes;
    'page-orders': Components.PageOrdersAttributes;
    'page-schedule-filter': Components.PageScheduleFilterAttributes;
    'page-schedule': Components.PageScheduleAttributes;
    'page-session': Components.PageSessionAttributes;
    'page-speaker-detail': Components.PageSpeakerDetailAttributes;
    'page-speaker-list': Components.PageSpeakerListAttributes;
    'page-support': Components.PageSupportAttributes;
    'page-tabs': Components.PageTabsAttributes;
    'register-wizard': Components.RegisterWizardAttributes;
    'image-uploader': Components.ImageUploaderAttributes;
    'generic-wizard': Components.GenericWizardAttributes;
  }


  interface HTMLAddressInputElement extends Components.AddressInput, HTMLStencilElement {}
  var HTMLAddressInputElement: {
    prototype: HTMLAddressInputElement;
    new (): HTMLAddressInputElement;
  };

  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLGenericCarouselElement extends Components.GenericCarousel, HTMLStencilElement {}
  var HTMLGenericCarouselElement: {
    prototype: HTMLGenericCarouselElement;
    new (): HTMLGenericCarouselElement;
  };

  interface HTMLAppDrawerElement extends Components.AppDrawer, HTMLStencilElement {}
  var HTMLAppDrawerElement: {
    prototype: HTMLAppDrawerElement;
    new (): HTMLAppDrawerElement;
  };

  interface HTMLAppEntranceElement extends Components.AppEntrance, HTMLStencilElement {}
  var HTMLAppEntranceElement: {
    prototype: HTMLAppEntranceElement;
    new (): HTMLAppEntranceElement;
  };

  interface HTMLPageAboutElement extends Components.PageAbout, HTMLStencilElement {}
  var HTMLPageAboutElement: {
    prototype: HTMLPageAboutElement;
    new (): HTMLPageAboutElement;
  };

  interface HTMLPageAccountElement extends Components.PageAccount, HTMLStencilElement {}
  var HTMLPageAccountElement: {
    prototype: HTMLPageAccountElement;
    new (): HTMLPageAccountElement;
  };

  interface HTMLPageCreateElement extends Components.PageCreate, HTMLStencilElement {}
  var HTMLPageCreateElement: {
    prototype: HTMLPageCreateElement;
    new (): HTMLPageCreateElement;
  };

  interface HTMLPageMapElement extends Components.PageMap, HTMLStencilElement {}
  var HTMLPageMapElement: {
    prototype: HTMLPageMapElement;
    new (): HTMLPageMapElement;
  };

  interface HTMLPageOrdersElement extends Components.PageOrders, HTMLStencilElement {}
  var HTMLPageOrdersElement: {
    prototype: HTMLPageOrdersElement;
    new (): HTMLPageOrdersElement;
  };

  interface HTMLPageScheduleFilterElement extends Components.PageScheduleFilter, HTMLStencilElement {}
  var HTMLPageScheduleFilterElement: {
    prototype: HTMLPageScheduleFilterElement;
    new (): HTMLPageScheduleFilterElement;
  };

  interface HTMLPageScheduleElement extends Components.PageSchedule, HTMLStencilElement {}
  var HTMLPageScheduleElement: {
    prototype: HTMLPageScheduleElement;
    new (): HTMLPageScheduleElement;
  };

  interface HTMLPageSessionElement extends Components.PageSession, HTMLStencilElement {}
  var HTMLPageSessionElement: {
    prototype: HTMLPageSessionElement;
    new (): HTMLPageSessionElement;
  };

  interface HTMLPageSpeakerDetailElement extends Components.PageSpeakerDetail, HTMLStencilElement {}
  var HTMLPageSpeakerDetailElement: {
    prototype: HTMLPageSpeakerDetailElement;
    new (): HTMLPageSpeakerDetailElement;
  };

  interface HTMLPageSpeakerListElement extends Components.PageSpeakerList, HTMLStencilElement {}
  var HTMLPageSpeakerListElement: {
    prototype: HTMLPageSpeakerListElement;
    new (): HTMLPageSpeakerListElement;
  };

  interface HTMLPageSupportElement extends Components.PageSupport, HTMLStencilElement {}
  var HTMLPageSupportElement: {
    prototype: HTMLPageSupportElement;
    new (): HTMLPageSupportElement;
  };

  interface HTMLPageTabsElement extends Components.PageTabs, HTMLStencilElement {}
  var HTMLPageTabsElement: {
    prototype: HTMLPageTabsElement;
    new (): HTMLPageTabsElement;
  };

  interface HTMLRegisterWizardElement extends Components.RegisterWizard, HTMLStencilElement {}
  var HTMLRegisterWizardElement: {
    prototype: HTMLRegisterWizardElement;
    new (): HTMLRegisterWizardElement;
  };

  interface HTMLImageUploaderElement extends Components.ImageUploader, HTMLStencilElement {}
  var HTMLImageUploaderElement: {
    prototype: HTMLImageUploaderElement;
    new (): HTMLImageUploaderElement;
  };

  interface HTMLGenericWizardElement extends Components.GenericWizard, HTMLStencilElement {}
  var HTMLGenericWizardElement: {
    prototype: HTMLGenericWizardElement;
    new (): HTMLGenericWizardElement;
  };

  interface HTMLElementTagNameMap {
    'address-input': HTMLAddressInputElement
    'app-root': HTMLAppRootElement
    'generic-carousel': HTMLGenericCarouselElement
    'app-drawer': HTMLAppDrawerElement
    'app-entrance': HTMLAppEntranceElement
    'page-about': HTMLPageAboutElement
    'page-account': HTMLPageAccountElement
    'page-create': HTMLPageCreateElement
    'page-map': HTMLPageMapElement
    'page-orders': HTMLPageOrdersElement
    'page-schedule-filter': HTMLPageScheduleFilterElement
    'page-schedule': HTMLPageScheduleElement
    'page-session': HTMLPageSessionElement
    'page-speaker-detail': HTMLPageSpeakerDetailElement
    'page-speaker-list': HTMLPageSpeakerListElement
    'page-support': HTMLPageSupportElement
    'page-tabs': HTMLPageTabsElement
    'register-wizard': HTMLRegisterWizardElement
    'image-uploader': HTMLImageUploaderElement
    'generic-wizard': HTMLGenericWizardElement
  }

  interface ElementTagNameMap {
    'address-input': HTMLAddressInputElement;
    'app-root': HTMLAppRootElement;
    'generic-carousel': HTMLGenericCarouselElement;
    'app-drawer': HTMLAppDrawerElement;
    'app-entrance': HTMLAppEntranceElement;
    'page-about': HTMLPageAboutElement;
    'page-account': HTMLPageAccountElement;
    'page-create': HTMLPageCreateElement;
    'page-map': HTMLPageMapElement;
    'page-orders': HTMLPageOrdersElement;
    'page-schedule-filter': HTMLPageScheduleFilterElement;
    'page-schedule': HTMLPageScheduleElement;
    'page-session': HTMLPageSessionElement;
    'page-speaker-detail': HTMLPageSpeakerDetailElement;
    'page-speaker-list': HTMLPageSpeakerListElement;
    'page-support': HTMLPageSupportElement;
    'page-tabs': HTMLPageTabsElement;
    'register-wizard': HTMLRegisterWizardElement;
    'image-uploader': HTMLImageUploaderElement;
    'generic-wizard': HTMLGenericWizardElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
