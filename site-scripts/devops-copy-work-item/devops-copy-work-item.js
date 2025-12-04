const popover = document.createElement('div');
popover.setAttribute('id', 'copied-work-item-link-popover');
popover.setAttribute('popover', '');

const pop = (workItemTitle) => {
  if (!workItemTitle) {
    popover.innerHTML = `Unable to find a work item to copy`;
  } else {
    popover.innerHTML = `👍 Copied link to <b>${workItemTitle}</b>`;
  }

  popover.togglePopover();

  setTimeout(() => {
    // popover.togglePopover();
  }, 5000);
};
document.addEventListener('keydown', function (event) {
  if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === ',') {
    let parentContainer = '';

    if (window.location.href.includes('/pullrequest/')) {
      parentContainer = '.repos-pr-title-row';
    } else if (
      window.location.href.includes('_workitems') ||
      window.location.search.includes('workitem')
    ) {
      parentContainer = '.work-item-form-header';
    }

    if (!parentContainer) {
      pop(null);
      return;
    }

    const copyButtons = document.querySelectorAll(
      `${parentContainer} button[aria-label="Copy to clipboard"]`
    );

    if (copyButtons.length === 0) {
      pop(null);
      return;
    }

    copyButtons[copyButtons.length - 1].click();
    pop(document.title);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(popover);
});
