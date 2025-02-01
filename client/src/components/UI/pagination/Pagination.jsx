import React, { useContext, useState } from 'react'
import style from './Pagination.module.css'
import { Context } from '../../..'
import { observer } from 'mobx-react-lite'

const Pagination = observer(() => {
	const { device } = useContext(Context)
	const pagesCount = Math.ceil(device.totalCount / device.limit)
	const pages = []

	for (let i = 0; i < pagesCount; i++) pages.push(i + 1)

	const next = () => {
		if (device.targetPage < pagesCount) {
			device.setTargetPage(device.targetPage + 1)
		}
	}

	const prev = () => {
		if (device.targetPage > 1) {
			device.setTargetPage(device.targetPage - 1)
		}
	}

	if (pagesCount > 1)
		return (
			<ul className={style.pagination}>
				<li className={style.item} onClick={prev}>
					<a className={style.pagination__newer} href='#'>
						PREV
					</a>
				</li>
				{pages.map(page => (
					<li
						className={
							page === device.targetPage
								? `${style.item} ${style.item__active}`
								: `${style.item}`
						}
						key={page}
						onClick={() => device.setTargetPage(page)}
					>
						<a href='#'>{page}</a>
					</li>
				))}
				<li className={style.item} onClick={next}>
					<a className={style.pagination__older} href='#'>
						NEXT
					</a>
				</li>
			</ul>
		)
})

export default Pagination
