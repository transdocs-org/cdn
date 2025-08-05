/**
 * 简单弹窗功能
 */

// 添加弹窗样式到页面
function addPopupStyles() {
  // 检查是否已经添加过样式
  if (document.getElementById('popup-styles')) {
    return;
  }

  const styles = /*css*/`
        .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .popup {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            width: 400px;
            max-width: 90%;
            overflow: hidden;
        }

        .popup-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            border-bottom: 1px solid #eee;
        }

        .popup-header h3 {
            margin: 0;
            color: #333;
        }

        .popup-close {
            font-size: 24px;
            cursor: pointer;
            color: #999;
        }

        .popup-close:hover {
            color: #333;
        }

        .popup-body {
            padding: 20px;
        }

        .popup-body p {
            margin: 0;
        }

        .popup-footer {
            display: flex;
            justify-content: flex-end;
            padding: 15px 20px;
            border-top: 1px solid #eee;
            gap: 10px;
        }

        .popup-confirm, .popup-cancel {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        .popup-confirm {
            background-color: #007bff;
            color: white;
        }

        .popup-cancel {
            background-color: #f8f9fa;
            color: #333;
            border: 1px solid #dee2e6;
        }
    `;

  const styleElement = document.createElement('style');
  styleElement.id = 'popup-styles';
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

// 创建弹窗元素
function createPopup(content) {
  // 添加样式
  addPopupStyles();

  // 创建遮罩层
  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';

  // 创建弹窗主体
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = /*html*/`
        <div class="popup-header">
            <h3>弹窗标题</h3>
            <span class="popup-close">&times;</span>
        </div>
        <div class="popup-body">
            <p>${content || '这是一个测试弹窗内容'}</p>
        </div>
        <div class="popup-footer">
            <button class="popup-confirm">确定</button>
            <button class="popup-cancel">取消</button>
        </div>
    `;

  // 添加到页面
  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  // 绑定关闭事件
  const closeBtn = popup.querySelector('.popup-close');
  const confirmBtn = popup.querySelector('.popup-confirm');
  const cancelBtn = popup.querySelector('.popup-cancel');

  const closePopup = () => {
    document.body.removeChild(overlay);
  };

  closeBtn.addEventListener('click', closePopup);
  confirmBtn.addEventListener('click', closePopup);
  cancelBtn.addEventListener('click', closePopup);
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
  // 检查session storage中是否有标记
  const popupShown = sessionStorage.getItem('__transdocs-popup-shown__');
  return !popupShown;
}

// 标记弹窗已显示
function markPopupAsShown() {
  sessionStorage.setItem('__transdocs-popup-shown__', 'true');
}

// 页面加载完成后显示弹窗
document.addEventListener('DOMContentLoaded', function () {
  if (shouldShowPopup()) {
    showPopup('这是测试弹窗内容！');
    markPopupAsShown();
  }
});
