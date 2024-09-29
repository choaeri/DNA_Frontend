import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { axiosInstance } from '../common/func/axios';
import './Home.css';
import Recommend from './Recommend/Recommend';
import ListView from './View/ListView/ListView';
import MapView from './View/MapView/MapView';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import AllReviews from './AllReviews/AllReviews';
import Popup from './Popup/Popup';
import LoginPopup from './LoginPopup/LoginPopup';

export default function Home() {
	const {
		setLocations,
		location,
		setLocation,
		setFacilityCount,
		viewMode,
		setViewMode,
		errMessageCheck,
		isLoginPopup,
		setIsLoginPopup,
	} = useContext(AppContext);

	useEffect(() => {
		// 지역 조회 API 호출
		const fetchLocations = async () => {
			try {
				const res = await axiosInstance.get('/api/public/locations');
				const data = res.data;
				if (Array.isArray(data)) {
					setLocations(data);
					data.forEach((locationItem) => {
						const locationName = locationItem.locationName; // locationName을 가져옴

						if (
							['yangyang', 'samcheok', 'gangneung', 'sokcho'].includes(
								locationName
							)
						) {
							location.beach.push(locationItem);
						} else if (
							['chuncheon', 'inje', 'goseong', 'pyeongchang'].includes(
								locationName
							)
						) {
							location.mount.push(locationItem);
						} else if (
							['yeongwol', 'hoengseong', 'jeongseon', 'hongcheon'].includes(
								locationName
							)
						) {
							location.culture.push(locationItem);
						}
					});
					setLocation(location);
				} else {
					setLocations([]);
				}
			} catch (err) {
				errMessageCheck(err.response.data.errorMessage);
			}
		};

		// 시설 수 API 호출
		const fetchFacilitiesCount = async () => {
			try {
				const res = await axiosInstance.get(
					`/api/public/locations/facilities/count`
				);
				setFacilityCount(res.data);
			} catch (err) {
				errMessageCheck(err.response.data.errorMessage);
			}
		};
		fetchLocations();
		fetchFacilitiesCount();
	}, []);

	return (
		<div className="DNAHome">
			<Popup />
			<LoginPopup
				message={'Your token has expired.\nPlease log in again to continue.'}
			/>
			<Header />
			<div className="Content">
				<Recommend />
				<div
					className="ViewContent"
					style={viewMode !== 'list' ? { paddingBottom: '4rem' } : null}
				>
					{viewMode === 'list' ? <ListView /> : <MapView />}
				</div>
				<AllReviews />
				<div className="ViewBtn">
					<button
						className="list"
						onClick={() => setViewMode('list')}
						style={
							viewMode === 'list'
								? { backgroundColor: 'var(--Gray-10, #FFF)' }
								: { backgroundColor: '#000', color: 'var(--Gray-10, #FFF)' }
						}
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect
								x="2.5"
								y="3.75"
								width="15"
								height="2.70833"
								rx="1.25"
								fill={viewMode === 'list' ? 'black' : 'white'}
							/>
							<rect
								x="2.5"
								y="8.95825"
								width="15"
								height="2.70833"
								rx="1.25"
								fill={viewMode === 'list' ? 'black' : 'white'}
							/>
							<rect
								x="2.5"
								y="14.1667"
								width="15"
								height="2.70833"
								rx="1.25"
								fill={viewMode === 'list' ? 'black' : 'white'}
							/>
						</svg>
						List
					</button>
					<button
						className="map"
						onClick={() => setViewMode('map')}
						style={
							viewMode === 'map'
								? { backgroundColor: 'var(--Gray-10, #FFF)', color: '#000' }
								: { backgroundColor: '#000' }
						}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="21"
							viewBox="0 0 20 21"
							fill="none"
						>
							<path
								d="M18.0766 4.13551C17.9643 4.04794 17.8336 3.98709 17.6943 3.95758C17.555 3.92807 17.4108 3.93068 17.2727 3.9652L12.6094 5.13083L7.92188 2.78708C7.72166 2.6869 7.4922 2.66168 7.275 2.71598L2.275 3.96598C2.07188 4.0162 1.89139 4.13293 1.76228 4.29758C1.63316 4.46223 1.56284 4.66534 1.5625 4.87458V16.1246C1.56252 16.267 1.59501 16.4076 1.65749 16.5356C1.71997 16.6637 1.8108 16.7757 1.92309 16.8634C2.03538 16.9511 2.16617 17.012 2.30553 17.0415C2.44488 17.0711 2.58914 17.0685 2.72734 17.034L7.39062 15.8683L12.0781 18.2121C12.2783 18.3123 12.5078 18.3375 12.725 18.2832L17.725 17.0332C17.9281 16.983 18.1086 16.8662 18.2377 16.7016C18.3668 16.5369 18.4372 16.3338 18.4375 16.1246V4.87458C18.4375 4.73206 18.405 4.59142 18.3424 4.46335C18.2799 4.33528 18.1889 4.22317 18.0766 4.13551ZM8.4375 5.14176L11.5625 6.70426V15.8574L8.4375 14.2949V5.14176ZM3.4375 5.61051L6.5625 4.82926V14.1425L3.4375 14.9238V5.61051ZM16.5625 15.3925L13.4375 16.1738V6.85661L16.5625 6.07536V15.3925Z"
								fill={viewMode === 'map' ? 'black' : 'white'}
							/>
						</svg>
						Map
					</button>
				</div>
			</div>
		</div>
	);
}
