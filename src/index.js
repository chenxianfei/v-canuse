const disabledTitle = '用户无该功能权限'
function compValue(value) {
  if (value instanceof Array) {
    for (let i = 0; i < value.length; i++) {
      let tempValue = compValue(value[i]);
      if (!tempValue.canuse) {
        return tempValue;
      }
    }
    let el;
    if (value.length >= 0) {
      el = value[0].el;
    }
    return { canuse: true, el }
  }
  if (typeof value === 'boolean') {
    return { canuse: value };
  }
  if (value instanceof Object) {
    return { canuse: value.canuse, title: value.title, el: value.el };
  }
}
//取消事件
function stopP(e) {
  e.stopPropagation()
  return false
}

function setDom(dom, hasPermission, title) {
  if (hasPermission !== true) { //如果不可用，
    if (!dom.__$disabledChild) {
      dom.classList.add('disabled'); //设置元素的样式
      let child = document.createElement('div')
      child.className = 'disabled-child';
      child.title = title || disabledTitle
      let position = window.getComputedStyle(dom)['position'];
      if (position === 'static') { // 这个判断的操作是为了让子元素覆盖住
        dom.oldStylePosition = dom.style.position;
        dom.style.position = 'relative'
      }
      dom.__$disabledChild = child;
      dom.appendChild(child)
      dom.addEventListener('click', stopP, true)
    }
  } else {
    dom.classList.remove('disabled')
    dom.removeEventListener('click', stopP, true);
    if (dom.__$disabledChild) {
      dom.removeChild(dom.__$disabledChild)
      dom.__$disabledChild = null;
    }
    dom.style.position = null;
    if (dom.oldStylePosition) {
      dom.style.position = dom.oldStylePosition;
    }
  }
}
export default {
  install: function (Vue, options) {
    Vue.directive('canuse', {
      bind: (el, binding, vnode) => {
      },
      inserted: function (el, binding, vnode) {
        let value = compValue(binding.value);
        if (value.el) {
          el = el.querySelector(value.el);
        }
        setDom(el, value.canuse, value.title)
      },
      update: function (el, binding, vnode) {
        let value = compValue(binding.value);
        if (value.el) {
          el = el.querySelector(value.el);
        }
        setDom(el, value.canuse, value.title)
      },
    })
  }
}