import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header';
import useLocalStorage from '../../../utils/useLocalStorage';
import { AppContext } from '../../../context/AppContext';
import { axiosInstance } from '../../../common/func/axios';
import { categoryMatch, locationImg, locationMatch } from '../../../common/func/match';
import './Likes.css';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import WorkationDetail from '../../DetailLocation/LocationMap/WorkationDetail/WorkationDetail';

export default function Likes() {
	const {
		isBookmarked,
		setIsBookmarked,
		isWorkationBookmarked,
		setIsWorkationBookmarked,
		setWorkationModal,
		onClickLike,
		errMessageCheck,
	} = useContext(AppContext);
	const [bookmarkList, setBookmarkList] = useState();
	const [bookmarkOfficeList, setBookmarkOfficeList] = useState();
	const [selectedBookmark, setSelectedBookmark] = useState(null);

	const newIsBookmarked = {};
	// 북마크 시설
	const fetchBookmark = async (facilityId) => {
		const apiUrl = `/api/facilities/${facilityId}/bookmark`;
		try {
			const response = await axiosInstance.get(apiUrl);
			const data = response.data;

			newIsBookmarked[facilityId] = data.isBookmarked;
		} catch (error) {
			errMessageCheck(error.response.data.errorMessage);
		}
	};

	// 북마크 워케이션 시설
	const newIsBookmarkedOffice = {};
	const fetchBookmarkOffice = async (facilityId) => {
		const apiUrl = `/api/workation-offices/${facilityId}/bookmark`;
		try {
			const response = await axiosInstance.get(apiUrl);
			const data = response.data;
			newIsBookmarkedOffice[facilityId] = data.isBookmarked;
		} catch (error) {
			errMessageCheck(error.response.data.errorMessage);
		}
	};

	useEffect(() => {
		const fetchBookmarkList = async () => {
			const apiUrl = `/api/facilities/bookmark`;
			try {
				const res = await axiosInstance.get(apiUrl);
				const data = res.data;
				if (Array.isArray(data)) {
					const groupedBookmarks = data.reduce((acc, bookmark) => {
						const location = bookmark.locationName;
						if (!acc[location]) {
							acc[location] = [];
						}
						acc[location].push(bookmark);
						return acc;
					}, {});
					setBookmarkList(groupedBookmarks);

					await Promise.all(data.map((item) => fetchBookmark(item.facilityId)));
					setIsBookmarked(newIsBookmarked);
				}
			} catch (error) {
				errMessageCheck(error.response.data.errorMessage);
			}
		};

		const fetchBookmarkOfficeList = async () => {
			const apiUrl = `/api/workation-offices/bookmark`;
			try {
				const res = await axiosInstance.get(apiUrl);
				const data = res.data;
				if (Array.isArray(data)) {
					const groupedBookmarks = data.reduce((acc, bookmark) => {
						const location = bookmark.locationName;
						if (!acc[location]) {
							acc[location] = [];
						}
						acc[location].push(bookmark);
						return acc;
					}, {});
					setBookmarkOfficeList(groupedBookmarks);

					await Promise.all(
						data.map((item) => fetchBookmarkOffice(item.officeId))
					);

					console.log('newIsBookmarkedOffice:', newIsBookmarkedOffice); // Log here
					setIsWorkationBookmarked(newIsBookmarkedOffice);
				}
			} catch (error) {
				errMessageCheck(error.response.data.errorMessage);
			}
		};

		fetchBookmarkList();
		fetchBookmarkOfficeList();
	}, []);

	const handleOpenDetail = (bookmark) => {
		setSelectedBookmark(bookmark);
		setWorkationModal(true);
	};

	return (
		<div className="Likes">
			<Header />
			<div className="bmkCnt">
				<div className="header">
					<span className="tit">Likes</span>
				</div>
				{bookmarkOfficeList && bookmarkList && (
					<div className="content">
						{Object.keys({ ...bookmarkList, ...bookmarkOfficeList }).map(
							(locationName, index) => (
								<React.Fragment key={index}>
									<span className="lcnName">{locationMatch[locationName]}</span>
									<div className="card wkn" key={index}>
										{bookmarkOfficeList[locationName] &&
											bookmarkOfficeList[locationName].map(
												(bookmark, idx) =>
													bookmark.type === 'Workation Office' && (
														<div className="item work" key={idx}>
															{isWorkationBookmarked &&
															isWorkationBookmarked[bookmark.officeId] ? (
																<HeartFilled
																	className="icon"
																	onClick={(e) =>
																		onClickLike(
																			e,
																			bookmark.officeId,
																			'Workation Office'
																		)
																	}
																	style={{ color: 'red' }}
																/>
															) : (
																<HeartOutlined
																	className="icon"
																	onClick={(e) =>
																		onClickLike(
																			e,
																			bookmark.officeId,
																			'Workation Office'
																		)
																	}
																	style={{ color: 'black' }}
																/>
															)}
															<div className="imgCnt">
																<img
																	src={locationImg[bookmark.officeId % 10]}
																	alt="location"
																/>
															</div>
															<div
																className="like wkn"
																onClick={() => handleOpenDetail(bookmark)}
															>
																<div className="exp">
																	<span className="type">
																		{categoryMatch[bookmark.type].type}
																	</span>
																	<span className="name">
																		{bookmark.officeName}
																	</span>
																</div>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="12"
																	height="13"
																	viewBox="0 0 12 13"
																	fill="none"
																>
																	<path
																		d="M8.64795 6.89795L4.89795 10.6479C4.79228 10.7536 4.64895 10.813 4.49951 10.813C4.35007 10.813 4.20675 10.7536 4.10107 10.6479C3.9954 10.5423 3.93604 10.399 3.93604 10.2495C3.93604 10.1001 3.9954 9.95675 4.10107 9.85107L7.4531 6.49998L4.10201 3.14795C4.04969 3.09562 4.00818 3.03351 3.97986 2.96514C3.95155 2.89678 3.93697 2.82351 3.93697 2.74951C3.93697 2.67551 3.95155 2.60224 3.97986 2.53388C4.00818 2.46551 4.04969 2.4034 4.10201 2.35107C4.15433 2.29875 4.21645 2.25724 4.28482 2.22893C4.35318 2.20061 4.42645 2.18604 4.50045 2.18604C4.57445 2.18604 4.64772 2.20061 4.71608 2.22893C4.78445 2.25724 4.84656 2.29875 4.89889 2.35107L8.64889 6.10107C8.70126 6.15339 8.7428 6.21554 8.77111 6.28394C8.79942 6.35235 8.81395 6.42567 8.81386 6.49971C8.81377 6.57374 8.79907 6.64703 8.7706 6.71537C8.74213 6.7837 8.70045 6.84575 8.64795 6.89795Z"
																		fill="#292C30"
																	/>
																</svg>
															</div>
															{selectedBookmark &&
																selectedBookmark.officeId ===
																	bookmark.officeId && (
																	<WorkationDetail
																		locationName={bookmark.locationName}
																		officeName={bookmark.officeName}
																		officeId={bookmark.officeId}
																	/>
																)}
														</div>
													)
											)}
									</div>
									<div className="card etc" key={index}>
										{/* Render Other Facility Bookmarks */}
										{bookmarkList[locationName] &&
											bookmarkList[locationName].map(
												(bookmark, idx) =>
													bookmark.type !== 'workation' && (
														<div className="item etc" key={idx}>
															<span className="type">
																{categoryMatch[bookmark.type].type}
															</span>
															<div className="like">
																<span className="name">
																	{bookmark.facilityName}
																</span>
																{isBookmarked &&
																isBookmarked[bookmark.facilityId] ? (
																	<HeartFilled
																		onClick={(e) =>
																			onClickLike(e, bookmark.facilityId)
																		}
																		style={{
																			color: 'red',
																			cursor: 'pointer',
																			marginLeft: 'auto',
																		}}
																	/>
																) : (
																	<HeartOutlined
																		onClick={(e) =>
																			onClickLike(e, bookmark.facilityId)
																		}
																		style={{
																			color: 'black',
																			cursor: 'pointer',
																			marginLeft: 'auto',
																		}}
																	/>
																)}
															</div>
														</div>
													)
											)}
									</div>
								</React.Fragment>
							)
						)}
					</div>
				)}
			</div>
		</div>
	);
}
