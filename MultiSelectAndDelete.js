import { filterMembersArrayDataAndRerender } from './AdminUIScript.js'

const multiDeleteButtonElement = document.getElementById('multiDeleteButton');
const parentCheckBoxElement = document.getElementById('parentCheckBox');

function highlightRow(memberId,enableStatus) {
    if (enableStatus == true) {
        document.getElementById(`member${memberId}`).style.backgroundColor = '#e8e8e8';
    }
    else {
        document.getElementById(`member${memberId}`).style.backgroundColor = 'white';
    }
}

parentCheckBoxElement.addEventListener('click', function () {
    if (parentCheckBoxElement.checked) {
        const currentPageCheckboxes = document.querySelectorAll('input[name="memberCheckBox"]');
        currentPageCheckboxes.forEach(checkBoxElement => {
            checkBoxElement.checked = true;
            let memberId = checkBoxElement.id.split('checkbox')[1]
            highlightRow(memberId,checkBoxElement.checked)
        })
    }
    else {
        const currentPageCheckboxes = document.querySelectorAll('input[name="memberCheckBox"]');
        currentPageCheckboxes.forEach(checkBoxElement => {
            checkBoxElement.checked = false;
            let memberId = checkBoxElement.id.split('checkbox')[1]
            highlightRow(memberId,checkBoxElement.checked)
        })
    }
})


multiDeleteButtonElement.addEventListener('click', function () {
    console.log('delete');
    const checkedBoxes = document.querySelectorAll('input[name="memberCheckBox"]:checked');
    const checkedMemberRowsIds = []
    checkedBoxes.forEach(checkbox => {
        let checkBoxId = checkbox.id
        let memberId = parseInt(checkBoxId.split('checkbox')[1]);
        console.log(memberId);
        checkedMemberRowsIds.push(memberId);
    })
    parentCheckBoxElement.checked = false;
    filterMembersArrayDataAndRerender(checkedMemberRowsIds);
})