import { paginateMembersTable } from './PaginationScript.js'
import { editRow, deleteRow } from './DeleteAndEditScript.js'

let memberDetailsList = null;
let filteredMembersData = null;

const getMembersData = async function () {
    const membersResponseObject = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
    console.log(membersResponseObject)
    memberDetailsList = await membersResponseObject.json();
    filteredMembersData = memberDetailsList.map(member => member);
    console.log(memberDetailsList)
}

export const createInitialActionsCell = (memberId) => {
    let actionsCellElement = document.createElement('td');
    actionsCellElement.setAttribute('id', `actionscell${memberId}`)
    let editIconElement = document.createElement("i");
    editIconElement.classList.add('fas', 'fa-user-edit');
    editIconElement.setAttribute('id', `editbutton${memberId}`)
    editIconElement.addEventListener('click', function (event) { editRow(event, memberId) })
    actionsCellElement.appendChild(editIconElement);

    let deleteIconElement = document.createElement("i");
    deleteIconElement.classList.add('fas', 'fa-trash-alt', 'delete-icon');
    deleteIconElement.setAttribute('id', `deletebutton${memberId}`)
    deleteIconElement.addEventListener('click', function (event) { deleteRow(event, memberId) })
    actionsCellElement.appendChild(deleteIconElement);

    return actionsCellElement
}

const changeCheckedRowBg=(event)=>{
    let memberId=event.target.id.split('checkbox')[1]
    if (event.target.checked==true){
        document.getElementById(`member${memberId}`).style.backgroundColor='#e8e8e8';
    }
    else{
        document.getElementById(`member${memberId}`).style.backgroundColor='white';
    }
}

const createMembersTableRow = (member) => {
    let memberDetailsRow = document.createElement('tr');

    let checkBoxCellElement = document.createElement('td');
    let checkBoxElement = document.createElement('input');
    checkBoxElement.setAttribute('id', `checkbox${member['id']}`)
    checkBoxElement.setAttribute('name', `memberCheckBox`)
    checkBoxElement.addEventListener('change',changeCheckedRowBg);
    checkBoxElement.type = 'checkbox'
    checkBoxCellElement.appendChild(checkBoxElement);
    memberDetailsRow.appendChild(checkBoxCellElement);

    for (let detail in member) {
        if (detail !== 'id') {
            let detailElement = document.createElement('td');
            detailElement.textContent = member[detail];
            detailElement.setAttribute('id', `${detail}${member['id']}`)
            memberDetailsRow.appendChild(detailElement);
        }
        else {
            memberDetailsRow.setAttribute('id', `member${member[detail]}`)
        }
    }

    let actionsCellElement = createInitialActionsCell(member['id'])
    memberDetailsRow.appendChild(actionsCellElement);

    return memberDetailsRow;
}

export const fillMembersTable = (membersData) => {
    const membersTableBodyElement = document.getElementById('membersTableBody');
    membersTableBodyElement.textContent = '';
    membersData.map(member => {
        let memberDetailsRow = createMembersTableRow(member)
        membersTableBodyElement.appendChild(memberDetailsRow)
    })
}



const filterMembersTable = (event) => {
    let searchText = event.target.value;
    console.log(searchText)
    filteredMembersData = memberDetailsList.filter(eachMember => {
        for (let detail in eachMember) {
            if (detail !== 'id') {
                if (eachMember[detail].toLowerCase().includes(searchText.toLowerCase())) {
                    return eachMember;
                }
            }
        }
    })
    console.log(filteredMembersData);
    paginateMembersTable(filteredMembersData);
}

export const filterMembersArrayDataAndRerender = (memberIds) => {
    filteredMembersData = filteredMembersData.filter(member => {
        if (!memberIds.includes(parseInt(member['id'] ))) {
            return member;
        }
    })
    memberDetailsList = memberDetailsList.filter(member => {
        if (!memberIds.includes(parseInt(member['id'] ))) {
            return member;
        }
    })
    paginateMembersTable(filteredMembersData);
    console.log(filteredMembersData);
}

export const updateDetailsInDetailsArray = (memberId, newName, newEmail, newRole) => {
    for (let member of memberDetailsList) {
        if (member.id == memberId) {
            member.name = newName;
            member.email = newEmail;
            member.role = newRole;
        }
        break;
    }
}

const functionsHandler = async () => {
    await getMembersData();
    let membersSearchElement = document.getElementById('membersSearch');
    membersSearchElement.addEventListener('input', function (event) { filterMembersTable(event) })
    paginateMembersTable(memberDetailsList);
}

functionsHandler()
