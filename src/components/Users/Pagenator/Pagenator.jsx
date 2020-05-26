import React from 'react';
import s from "./Pagenator.module.css";
import {NavLink} from "react-router-dom";

let Pagenator = (props) => {

    function pagesList(numberOfPages, currentPage, listLenght) {
        let simpleList=false
        let absoluteListLenght = listLenght*2 + 5
        if (absoluteListLenght>=numberOfPages) {
            absoluteListLenght=numberOfPages;
            simpleList=true}

        let startPage = 1;

        if (simpleList) {return iterationList (absoluteListLenght, 1, currentPage)}

        let prefix = false
        let sufix = false

        if (currentPage>listLenght+3 && !simpleList) {prefix=true}
        if (currentPage<numberOfPages-listLenght-2 && !simpleList) {sufix=true}

        if (sufix && !prefix) {
            let b = iterationList (absoluteListLenght-2, 1, currentPage)
            b.push("...", numberOfPages)
            return b}

        if (!sufix && prefix) {
            let c = [1, "..."]
            let b = c.concat(iterationList (absoluteListLenght-2, numberOfPages-listLenght*2-2, currentPage))
            return b
        }

        if(sufix && prefix) {
            let c = [1, "..."]
            let b = c.concat(iterationList (absoluteListLenght-4, currentPage-listLenght, currentPage))
            b.push("...", numberOfPages)
            return b
        }

        // ============= function iteration List
        function iterationList (elements, startElement, currentPage) {
            let arr0 =[]
            for (let i=startElement; i<elements+startElement; i++){

                arr0.push(i)
            }
            return arr0
        }
    }

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);


    let arr = pagesList(pagesCount, props.currentPage, 3)


    return <div>
        <div className={s.pageSelector} onWheel={(e) => (props.onMousePageChanged(e.deltaY, props.currentPage, pagesCount))}>
            <div className={s.pageSelectorContent}>
                <span>Page: </span>
                <div className={s.divide}></div>
                {arr.map(p=>{
                    return <div className={props.currentPage === p ? s.selectedPage : s.pageNumberBox }
                                onClick={p=="..." ? null :((e) =>{props.onPageChanged(p)})}>{" "}{ p }{" "}</div>
                })}
            </div>
        </div>


    </div>
}

export default Pagenator;

//(e) => (e.deltaY>0? props.onPageChanged(props.currentPage-1):props.onPageChanged(props.currentPage+1))