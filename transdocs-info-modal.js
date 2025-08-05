// 添加弹窗样式到页面
function addPopupStyles() {
  // 检查是否已经添加过样式
  if (document.getElementById('transdocs-modal-styles')) {
    return;
  }

  const styles = /*css*/`
    .transdocs-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999999;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .transdocs-modal {
      min-width: 400px;
      max-width: 90%;
      border-radius: 8px;
      background-color: #fff;
      color: #333;
      font-size: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      overflow: hidden;
    }

    .transdocs-modal h3, .transdocs-modal h2, .transdocs-modal p {
      margin: 0;
      padding: 0
    }

    .transdocs-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      border-bottom: 1px solid #eee;
    }

    .transdocs-modal-header h3 {
      color: #000;
    }

    .transdocs-modal-close {
      font-size: 24px;
      cursor: pointer;
      color: #999;
    }

    .transdocs-modal-close:hover {
      color: #333;
    }

    .transdocs-modal-body {
      padding: 20px;
    }

    .transdocs-modal-body p {
      margin: 10px 0;
    }

    .transdocs-modal-body strong {
      font-weight: bold;
      color: #000;
    }

    .transdocs-modal-body a {
      color: blue;
      text-decoration: underline;
    }
  `;

  const styleElement = document.createElement('style');
  styleElement.id = 'transdocs-modal-styles';
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

// 创建弹窗元素
function createPopup() {
  // 添加样式
  addPopupStyles();

  // 创建遮罩层
  const overlay = document.createElement('div');
  overlay.className = 'transdocs-modal-overlay';

  // 创建弹窗主体
  const popup = document.createElement('div');
  popup.className = 'transdocs-modal';
  popup.innerHTML = /*html*/`
    <div class="transdocs-modal-header">
      <h3>🎉 欢迎来到TransDocs！ 🎉</h3>
      <span class="transdocs-modal-close">&times;</span>
    </div>
    <div class="transdocs-modal-body">
      <p>我们专注于<strong>精准翻译文档</strong>，力求<strong>100%还原官网内容与风格</strong>，为您呈现高质量、无偏差的阅读体验。</p>
      <p>点击了解更多翻译文档 → <a href="https://transdocs.org" target="_blank" title="TransDocs 官网">https://transdocs.org</p>
    </div>
  `;

  const html = document.querySelector('html');

  // 添加到页面
  overlay.appendChild(popup);
  html.appendChild(overlay);

  // 绑定关闭事件
  const closeBtn = popup.querySelector('.transdocs-modal-close');

  const closePopup = () => {
    html.removeChild(overlay);
  };

  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closePopup();
    }
  });

  return overlay;
}

// 显示弹窗
function showPopup(content) {
  return createPopup(content);
}

// 检查是否应该显示弹窗
function shouldShowPopup() {
  const popupShown = sessionStorage.getItem('__transdocs-modal-shown__');
  return !popupShown;
}

// 标记弹窗已显示
function markPopupAsShown() {
  sessionStorage.setItem('__transdocs-modal-shown__', 'true');
}

// 页面加载完成后显示弹窗
document.addEventListener('DOMContentLoaded', function () {
  if (shouldShowPopup()) {
    showPopup();
    markPopupAsShown();
  }
});
