import React from "react";
import {Engagement} from "../../models/engagement";
import {capitalizeFirst} from "../../utils/extensions/capitalize_first";

export function CardEngagement(item: Engagement, onClick:any) {

    return (
        <div key={item._id}
             onClick={onClick}
             className={"p-2 rounded-lg shadow-lg border hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out md:active:border-2 md:active:border-black md:active:shadow-none cursor-pointer"}>
            <img className={"w-full rounded-lg aspect-square bg-cover"} src={item.data.image_url}
                 alt={item.data.username}/>
            <p className={"font-bold text-xl"}>{item.data.username}</p>
            <p>{item.data.course}</p>
            <p>Hasil: <span className={"font-bold"}>{capitalizeFirst(item.data.expression)}</span></p>
            <div className={"text-right md:hidden"}>
                <button type="button"
                        className="py-2 px-5 my-1 text-white bg-blue-700 font-medium rounded-lg text-sm hover:bg-blue-800 active:bg-blue-500 cursor-pointer"
                        onClick={onClick}
                >Detail
                </button>
            </div>
        </div>
    )
}

export function CardEngagementLoading() {
    return (
        <div
            className={"p-2 rounded-lg animate-pulse shadow-lg border hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out md:active:border-2 md:active:border-black md:active:shadow-none cursor-pointer"}>
            <div className={"w-full rounded-lg aspect-square bg-cover bg-gray-500"}></div>
            <div className={"h-5 w-1/2 my-2 rounded-lg bg-gray-200"}></div>
            <div className={"h-5 w-full my-2 rounded-lg bg-gray-200"}></div>
        </div>
    )
}