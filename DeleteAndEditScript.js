import { createInitialActionsCell, filterMembersArrayDataAndRerender,updateDetailsInDetailsArray } from './AdminUIScript.js'

let currMemberRow = { name: '', email: '', role: '' }

const setMemberRowData=(memberId,newName,newEmail,newRole)=>{
    let memberNameElement = document.getElementById(`name${memberId}`)
    memberNameElement.innerHTML = ''
    memberNameElement.textContent = newName
    let memberEmailElement = document.getElementById(`email${memberId}`)
    memberEmailElement.innerHTML = ''
    memberEmailElement.textContent = newEmail
    let memberRoleElement = document.getElementById(`role${memberId}`)
    memberRoleElement.innerHTML = ''
    memberRoleElement.textContent = newRole
    updateDetailsInDetailsArray(memberId,newName,newEmail,newRole);
}

const cancelChanges = (memberId) => {
    let actionsCellElement = createInitialActionsCell(memberId)
    document.getElementById(`actionscell${memberId}`).remove()
    document.getElementById(`member${memberId}`).appendChild(actionsCellElement)
    setMemberRowData(memberId,currMemberRow.name,currMemberRow.email,currMemberRow.role);
}

const saveChanges = (memberId) => {
    let actionsCellElement = createInitialActionsCell(memberId)
    document.getElementById(`actionscell${memberId}`).remove()
    document.getElementById(`member${memberId}`).appendChild(actionsCellElement)
    let memberNameInputElementValue = document.getElementById(`nameInput${memberId}`).value;
    let memberEmailInputElementValue = document.getElementById(`emailInput${memberId}`).value;
    let memberRoleInputElementValue = document.getElementById(`roleInput${memberId}`).value;
    setMemberRowData(memberId,memberNameInputElementValue,memberEmailInputElementValue,memberRoleInputElementValue);
}

const createAndAppendSaveAndCancelIcons = (memberId) => {
    let actionsCellElement = document.getElementById(`actionscell${memberId}`)
    let editIconElement = document.getElementById(`editbutton${memberId}`);
    editIconElement.style.display = 'none';

    let cancelIconElement = document.createElement("i");
    cancelIconElement.classList.add('fas', 'fa-times-circle', 'cancel-icon');
    cancelIconElement.setAttribute('id', `cancelbutton${memberId}`)
    cancelIconElement.addEventListener('click', function () { cancelChanges(memberId) })
    actionsCellElement.prepend(cancelIconElement);

    let saveIconElement = document.createElement("i");
    saveIconElement.classList.add('fas', 'fa-save');
    saveIconElement.setAttribute('id', `savebutton${memberId}`)
    saveIconElement.addEventListener('click', function () { saveChanges(memberId) })
    actionsCellElement.prepend(saveIconElement);


}

const createAndAppendInputElement = (element, colName, memberId) => {
    let prevTextContent = element.textContent;
    element.textContent = ''
    let tempInputElement = document.createElement('input')
    tempInputElement.value = prevTextContent
    tempInputElement.setAttribute('id',`${colName}Input${memberId}`)
    element.appendChild(tempInputElement)
}

export const editRow = (event, memberId) => {
    let memberNameElement = document.getElementById(`name${memberId}`)
    currMemberRow.name = memberNameElement.textContent
    let memberEmailElement = document.getElementById(`email${memberId}`)
    currMemberRow.email = memberEmailElement.textContent
    let memberRoleElement = document.getElementById(`role${memberId}`)
    currMemberRow.role = memberRoleElement.textContent
    createAndAppendInputElement(memberNameElement, 'name', memberId);
    createAndAppendInputElement(memberEmailElement, 'email', memberId);
    createAndAppendInputElement(memberRoleElement, 'role', memberId);
    createAndAppendSaveAndCancelIcons(memberId)
}

export const deleteRow = (event, memberId) => {
    document.getElementById(`member${memberId}`).remove();
    filterMembersArrayDataAndRerender([parseInt(memberId)]);
}