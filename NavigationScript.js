import { fillMembersTable } from './AdminUIScript.js'

let currPageNumber = null;

export const onClickPageButton = (pageNumber, membersData) => {
    console.log(pageNumber);
    currPageNumber = pageNumber;
    //const totalNoOfPages=Math.ceil(membersData.length / 10);
    resetAndHighlightNavigationButton(pageNumber, Math.ceil(membersData.length / 10))
    let pageStartIndex = (pageNumber - 1) * 10
    let pageEndIndex = pageStartIndex + 9 < membersData.length ? pageStartIndex + 9 : membersData.length - 1
    let currentPageMembersData = membersData.slice(pageStartIndex, pageEndIndex + 1)
    console.log(currentPageMembersData);
    fillMembersTable(currentPageMembersData);
}

const resetAndHighlightNavigationButton = (currPageNumber, totalNoOfPages) => {
    for (let i = 1; i <= totalNoOfPages; i++) {
        //console.log(i);
        if (currPageNumber !== i) {
            document.getElementById(`numberedButton${i}`).classList.remove('navigation-button-selected');
        }
        else {
            document.getElementById(`numberedButton${i}`).classList.add('navigation-button-selected');
        }
    }
}



export const specialButtonsFunction = (totalNoOfPages, membersData) => {
    let startPageButtonElement = document.getElementById('startPageButton');
    startPageButtonElement.onclick = function () {
        if (totalNoOfPages > 1) {
            onClickPageButton(1, membersData);
        }
    }

    let prevPageButtonElement = document.getElementById('prevPageButton');
    prevPageButtonElement.onclick = function () {
        if (currPageNumber - 1 >= 1) {
            onClickPageButton(currPageNumber - 1, membersData);
        }
    }

    let nextPageButtonElement = document.getElementById('nextPageButton');
    nextPageButtonElement.onclick = function () {
        if (currPageNumber + 1 <= totalNoOfPages) {
            onClickPageButton(currPageNumber + 1, membersData);
        }
    }

    let lastPageButtonElement = document.getElementById('lastPageButton');
    lastPageButtonElement.onclick = function () {
        if (totalNoOfPages > 1) {
            onClickPageButton(totalNoOfPages, membersData);
        }
    }
}