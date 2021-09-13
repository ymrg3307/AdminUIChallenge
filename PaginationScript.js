import { onClickPageButton,specialButtonsFunction} from './NavigationScript.js'


const createAndAppendPageNumberedButton = (number, membersData) => {
    let numberedPagenavigationButtonsContainerElement = document.getElementById('numberedPagenavigationButtonsContainer');
    let pageButton = document.createElement('button')
    let totalNoOfPages=Math.ceil(membersData.length / 10)
    pageButton.textContent = number
    pageButton.classList.add('navigation-button');
    pageButton.setAttribute('id', `numberedButton${number}`);
    pageButton.addEventListener('click', function () { onClickPageButton(number, membersData) })
    numberedPagenavigationButtonsContainerElement.appendChild(pageButton);
    if (number === totalNoOfPages) {
        onClickPageButton(1, membersData);
        console.log(number);
        console.log(`totalpage are ${totalNoOfPages}`);
        specialButtonsFunction(totalNoOfPages,membersData);
    }  
}

export const paginateMembersTable = (membersData) => {
    let numberedPagenavigationButtonsContainerElement = document.getElementById('numberedPagenavigationButtonsContainer');
    numberedPagenavigationButtonsContainerElement.textContent = ''
    let totalPagesRequired = Math.ceil(membersData.length / 10)
    console.log(totalPagesRequired);
    if (totalPagesRequired >= 1) {
        document.getElementById('infoMsg').style.display='none'; 
        for (let i = 1; i <= totalPagesRequired; i++) {
            createAndAppendPageNumberedButton(i, membersData)
        }
    }
    else {
        const membersTableBodyElement = document.getElementById('membersTableBody');
        membersTableBodyElement.textContent = '';
        document.getElementById('infoMsg').style.display='block'; 
    }
}


