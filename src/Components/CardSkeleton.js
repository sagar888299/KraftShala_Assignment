import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CardSkeleton() {
  return (
    <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md w-80 sm:w-80">
    <Skeleton height={40} width={200} className="mb-4" />
    <Skeleton height={40} width={200} className="mb-4" />
    <Skeleton height={200} width={200} className="mb-4" />
    <Skeleton height={40} width={200} className="mb-4" />
    <Skeleton height={40} width={200} className="mb-4" />
    <Skeleton height={40} width={200} className="mb-4" />
    <Skeleton height={40} width={200} className="mb-4" />
    <Skeleton height={40} width={200} className="mb-4" />
  </div>
  )
}
