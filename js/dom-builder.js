// Syntactic sugar for accessible elements 

// Get the single element  based on a CSS selector
// Eg., $('#App')
window.$ = document.querySelector.bind(document);

// Get a group of elements based on a CSS selector
// Eg., $$('.Cells')
window.$$ = document.querySelectorAll.bind(document);

/**
  This is one the most interesting part for building the DOM elements.
  It (ab)uses the latest JS proxy feature which I have been using for quite long period of time.

  It takes the tag, attribtutes and children, sets the attributes in element and appends the children
  to it and finally returns the element.

  D.span
  D.div

  Here span and div is the tagName, it is tag parameter in the "get" function
  Attributes are like class, id etc.,
  if text then text node is created or else the element is  created and then appended.

  Eg:. D.div({ class: 'Home' }, D.h1({}, "Level 1"))
*/
window.D = new Proxy(
  {},
  {
    get(target, tag) {
      return function(attributes = {}, ...children) {
        const $el = document.createElement(tag);

        for (const property of Object.keys(attributes)) {
          $el.setAttribute(property, attributes[property]);
        }

        for (let child of children) {
          if (typeof child === "string" || typeof child === "number") {
            child = document.createTextNode("" + child);
          }

          $el.appendChild(child);
        }

        return $el;
      };
    }
  }
);