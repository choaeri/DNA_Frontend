import { useContext, useState, useRef } from 'react';
import { AppContext } from '../../../context/AppContext';
import './LocationMap.css';
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { axiosInstance } from '../../../common/func/axios';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import WorkationDetail from './WorkationDetail/WorkationDetail';
import { categoryMatch, locationImg } from '../../../common/func/match';

export default function LocationMap({ centerMarker }) {
	const {
		detailInfo,
		isBookmarked,
		setIsBookmarked,
		isWorkationBookmarked,
		setIsWorkationBookmarked,
		setWorkationModal,
		onClickLike,
		errMessageCheck,
	} = useContext(AppContext);
	const [selectCategory, setSelectCategory] = useState('');
	const [markers, setMarkers] = useState(null);
	const [info, setInfo] = useState(null);
	const mapRef = useRef();

	const onClickCategoryBtn = async (category) => {
		setSelectCategory(`${category}`);
		setInfo(null);
		try {
			if (category === 'Workation Office') {
				const res = await axiosInstance.get(
					`/api/public/locations/${detailInfo.locationId}/workation-offices/search`
				);
				setMarkers(res.data);
			} else {
				const res = await axiosInstance.get(
					`/api/public/locations/${detailInfo.locationId}/facilities/search?facilityType=${category}`
				);
				setMarkers(res.data);
			}
		} catch (err) {
			errMessageCheck(err.response.data.errorMessage);
		}
	};

	const onClickMarker = async (marker) => {
		setInfo(marker);

		if (marker.type === 'Workation Office') {
			try {
				const response = await axiosInstance.get(
					`/api/workation-offices/${marker.facilityId}/bookmark`
				);
				const data = response.data;
				setIsWorkationBookmarked({
					[marker.facilityId]: data.isBookmarked,
				});
			} catch (error) {
				errMessageCheck(error.response.data.errorMessage);
			}
		} else {
			try {
				const response = await axiosInstance.get(
					`/api/facilities/${marker.facilityId}/bookmark`
				);
				const data = response.data;
				setIsBookmarked({
					[marker.facilityId]: data.isBookmarked,
				});
			} catch (error) {
				errMessageCheck(error.response.data.errorMessage);
			}
		}
	};

	const onClusterclick = (_target, cluster) => {
		const map = mapRef.current;
		const level = map.getLevel() - 1;
		map.setLevel(level, { anchor: cluster.getCenter() });
	};

	return (
		<Map className="map" center={centerMarker} level={8} ref={mapRef}>
			<div className="locationDetail">
				<div className="category">
					<button onClick={() => onClickCategoryBtn('Workation Office')}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
						>
							<path
								d="M17.3664 9.61381L10.4914 0.863807C10.433 0.789392 10.3583 0.729231 10.2732 0.687863C10.1881 0.646495 10.0947 0.625 10 0.625C9.9054 0.625 9.81199 0.646495 9.72686 0.687863C9.64174 0.729231 9.56712 0.789392 9.50864 0.863807L2.63364 9.61381C2.54722 9.72389 2.50024 9.85979 2.50024 9.99974C2.50024 10.1397 2.54722 10.2756 2.63364 10.3857L9.50864 19.1357C9.56712 19.2101 9.64174 19.2703 9.72686 19.3116C9.81199 19.353 9.9054 19.3745 10 19.3745C10.0947 19.3745 10.1881 19.353 10.2732 19.3116C10.3583 19.2703 10.433 19.2101 10.4914 19.1357L17.3664 10.3857C17.4529 10.2756 17.4998 10.1397 17.4998 9.99974C17.4998 9.85979 17.4529 9.72389 17.3664 9.61381ZM10.625 12.1544V3.05678L15.8922 9.7599L10.625 12.1544ZM9.37504 12.1544L4.10786 9.7599L9.37504 3.05678V12.1544ZM9.37504 13.5271V16.9427L5.20082 11.6302L9.37504 13.5271Z"
								fill="#1D2024"
							/>
						</svg>
						<span className="item work">Workation Office</span>
					</button>
					<button onClick={() => onClickCategoryBtn('restaurant')}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
						>
							<path
								d="M16.875 3.12489V17.4999C16.875 17.6656 16.8092 17.8246 16.6919 17.9418C16.5747 18.059 16.4158 18.1249 16.25 18.1249C16.0842 18.1249 15.9253 18.059 15.8081 17.9418C15.6908 17.8246 15.625 17.6656 15.625 17.4999V13.7499H11.875C11.7092 13.7499 11.5503 13.684 11.4331 13.5668C11.3158 13.4496 11.25 13.2906 11.25 13.1249C11.279 11.6278 11.4681 10.138 11.8141 8.68114C12.5781 5.51786 14.0266 3.39754 16.0039 2.55067C16.0989 2.50996 16.2026 2.49346 16.3056 2.50266C16.4086 2.51185 16.5077 2.54645 16.594 2.60335C16.6803 2.66026 16.7512 2.73769 16.8002 2.82871C16.8493 2.91973 16.875 3.02149 16.875 3.12489ZM9.36641 3.02254C9.35417 2.94048 9.32571 2.86167 9.28269 2.79072C9.23967 2.71976 9.18295 2.65809 9.11585 2.60928C9.04874 2.56048 8.97259 2.52553 8.89184 2.50647C8.81108 2.4874 8.72734 2.48461 8.6455 2.49825C8.56365 2.51189 8.48534 2.54169 8.41513 2.58592C8.34492 2.63014 8.28423 2.6879 8.23658 2.75583C8.18893 2.82376 8.15528 2.90049 8.1376 2.98156C8.11992 3.06263 8.11856 3.14641 8.13359 3.22801L8.74141 6.87489H6.875V3.12489C6.875 2.95913 6.80915 2.80016 6.69194 2.68294C6.57473 2.56573 6.41576 2.49989 6.25 2.49989C6.08424 2.49989 5.92527 2.56573 5.80806 2.68294C5.69085 2.80016 5.625 2.95913 5.625 3.12489V6.87489H3.75859L4.36641 3.22801C4.38144 3.14641 4.38008 3.06263 4.3624 2.98156C4.34472 2.90049 4.31107 2.82376 4.26342 2.75583C4.21577 2.6879 4.15507 2.63014 4.08487 2.58592C4.01466 2.54169 3.93635 2.51189 3.8545 2.49825C3.77266 2.48461 3.68892 2.4874 3.60816 2.50647C3.52741 2.52553 3.45126 2.56048 3.38415 2.60928C3.31705 2.65809 3.26033 2.71976 3.21731 2.79072C3.17429 2.86167 3.14583 2.94048 3.13359 3.02254L2.50859 6.77254C2.50298 6.80637 2.50011 6.8406 2.5 6.87489C2.50125 7.76068 2.81556 8.61751 3.3874 9.29399C3.95923 9.97048 4.75178 10.4231 5.625 10.5718V17.4999C5.625 17.6656 5.69085 17.8246 5.80806 17.9418C5.92527 18.059 6.08424 18.1249 6.25 18.1249C6.41576 18.1249 6.57473 18.059 6.69194 17.9418C6.80915 17.8246 6.875 17.6656 6.875 17.4999V10.5718C7.74822 10.4231 8.54077 9.97048 9.1126 9.29399C9.68444 8.61751 9.99875 7.76068 10 6.87489C9.99989 6.8406 9.99701 6.80637 9.99141 6.77254L9.36641 3.02254Z"
								fill="black"
							/>
						</svg>
						<span className="item rnt">Restaurant</span>
					</button>
					<button onClick={() => onClickCategoryBtn('cafe')}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
						>
							<path
								d="M16.25 6.25H2.5C2.33424 6.25 2.17527 6.31585 2.05806 6.43306C1.94085 6.55027 1.875 6.70924 1.875 6.875V10.625C1.87687 11.6891 2.10442 12.7406 2.54264 13.7102C2.98086 14.6799 3.61977 15.5455 4.41719 16.25H2.5C2.33424 16.25 2.17527 16.3158 2.05806 16.4331C1.94085 16.5503 1.875 16.7092 1.875 16.875C1.875 17.0408 1.94085 17.1997 2.05806 17.3169C2.17527 17.4342 2.33424 17.5 2.5 17.5H16.25C16.4158 17.5 16.5747 17.4342 16.6919 17.3169C16.8092 17.1997 16.875 17.0408 16.875 16.875C16.875 16.7092 16.8092 16.5503 16.6919 16.4331C16.5747 16.3158 16.4158 16.25 16.25 16.25H14.3328C15.29 15.4016 16.0159 14.3239 16.4422 13.118C17.236 13.0691 17.9813 12.7193 18.5263 12.14C19.0712 11.5606 19.3747 10.7953 19.375 10V9.375C19.375 8.5462 19.0458 7.75134 18.4597 7.16529C17.8737 6.57924 17.0788 6.25 16.25 6.25ZM18.125 10C18.1247 10.4044 17.9937 10.7978 17.7516 11.1216C17.5094 11.4454 17.169 11.6823 16.7812 11.7969C16.8432 11.4093 16.8745 11.0175 16.875 10.625V7.60781C17.2405 7.73703 17.5569 7.97634 17.7808 8.29281C18.0046 8.60928 18.1249 8.98736 18.125 9.375V10ZM8.75 4.375V1.875C8.75 1.70924 8.81585 1.55027 8.93306 1.43306C9.05027 1.31585 9.20924 1.25 9.375 1.25C9.54076 1.25 9.69973 1.31585 9.81694 1.43306C9.93415 1.55027 10 1.70924 10 1.875V4.375C10 4.54076 9.93415 4.69973 9.81694 4.81694C9.69973 4.93415 9.54076 5 9.375 5C9.20924 5 9.05027 4.93415 8.93306 4.81694C8.81585 4.69973 8.75 4.54076 8.75 4.375ZM11.25 4.375V1.875C11.25 1.70924 11.3158 1.55027 11.4331 1.43306C11.5503 1.31585 11.7092 1.25 11.875 1.25C12.0408 1.25 12.1997 1.31585 12.3169 1.43306C12.4342 1.55027 12.5 1.70924 12.5 1.875V4.375C12.5 4.54076 12.4342 4.69973 12.3169 4.81694C12.1997 4.93415 12.0408 5 11.875 5C11.7092 5 11.5503 4.93415 11.4331 4.81694C11.3158 4.69973 11.25 4.54076 11.25 4.375ZM6.25 4.375V1.875C6.25 1.70924 6.31585 1.55027 6.43306 1.43306C6.55027 1.31585 6.70924 1.25 6.875 1.25C7.04076 1.25 7.19973 1.31585 7.31694 1.43306C7.43415 1.55027 7.5 1.70924 7.5 1.875V4.375C7.5 4.54076 7.43415 4.69973 7.31694 4.81694C7.19973 4.93415 7.04076 5 6.875 5C6.70924 5 6.55027 4.93415 6.43306 4.81694C6.31585 4.69973 6.25 4.54076 6.25 4.375Z"
								fill="#1D2024"
							/>
						</svg>
						<span className="item cafe">Cafe</span>
					</button>
					<button onClick={() => onClickCategoryBtn('accommodation')}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="17"
							height="16"
							viewBox="0 0 17 16"
							fill="none"
						>
							<path
								d="M15.5 12.9999H14.5V7.22179C14.5 7.08339 14.4713 6.94649 14.4157 6.81976C14.3601 6.69303 14.2788 6.57922 14.1769 6.48554L9.17688 1.76804C9.17443 1.76591 9.17213 1.76361 9.17 1.76116C8.98591 1.59375 8.74602 1.50098 8.49719 1.50098C8.24836 1.50098 8.00846 1.59375 7.82438 1.76116L7.8175 1.76804L2.82312 6.48554C2.72125 6.57922 2.63993 6.69303 2.58431 6.81976C2.52869 6.94649 2.49998 7.08339 2.5 7.22179V12.9999H1.5C1.36739 12.9999 1.24021 13.0526 1.14645 13.1464C1.05268 13.2401 1 13.3673 1 13.4999C1 13.6325 1.05268 13.7597 1.14645 13.8535C1.24021 13.9472 1.36739 13.9999 1.5 13.9999H15.5C15.6326 13.9999 15.7598 13.9472 15.8536 13.8535C15.9473 13.7597 16 13.6325 16 13.4999C16 13.3673 15.9473 13.2401 15.8536 13.1464C15.7598 13.0526 15.6326 12.9999 15.5 12.9999ZM10 12.9999H7V9.99991C7 9.8673 7.05268 9.74013 7.14645 9.64636C7.24021 9.55259 7.36739 9.49991 7.5 9.49991H9.5C9.63261 9.49991 9.75979 9.55259 9.85355 9.64636C9.94732 9.74013 10 9.8673 10 9.99991V12.9999Z"
								fill="black"
							/>
						</svg>
						<span className="item acc">Accommodation</span>
					</button>
				</div>
				<MarkerClusterer
					averageCenter={true}
					minLevel={4}
					disableClickZoom={true}
					onClusterclick={onClusterclick}
				>
					{selectCategory !== '' && markers
						? markers.map((marker, idx) => (
								<MapMarker
									key={idx}
									position={{ lat: marker.latitude, lng: marker.longitude }}
									image={{
										src: categoryMatch[selectCategory].img,
										size: {
											width: 25,
											height: 25,
										},
									}}
									onClick={() => onClickMarker(marker)}
									style={{ zIndex: 1000 }}
								>
									{info &&
										info.facilityId === marker.facilityId &&
										(selectCategory === 'Workation Office' ? (
											<div className="markerCnt wkn">
												<div>
													{isWorkationBookmarked &&
													isWorkationBookmarked[info.facilityId] ? (
														<HeartFilled
                              className='icon'
															onClick={(e) =>
																onClickLike(e, info.facilityId, info.type)
															}
															style={{
																color: 'red',
															}}
														/>
													) : (
														<HeartOutlined
                              className='icon'
															onClick={(e) =>
																onClickLike(e, info.facilityId, info.type)
															}
															style={{
																color: 'black',
															}}
														/>
													)}
												</div>
												<div>
													<img
														src={locationImg[marker.facilityId % 10]}
														onClick={() => setWorkationModal(true)}
														alt=""
													></img>
												</div>
												<div
													className="facInfo"
													onClick={() => setWorkationModal(true)}
												>
													<div
														style={{ display: 'flex', flexDirection: 'column' }}
													>
														<span className="type">Workation Office</span>
														<span className="tit">{info.facilityName}</span>
													</div>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="7"
														height="13"
														viewBox="0 0 7 13"
														fill="none"
													>
														<path
															d="M6.53109 7.0306L1.53109 12.0306C1.39019 12.1715 1.19909 12.2506 0.999836 12.2506C0.800579 12.2506 0.609482 12.1715 0.468586 12.0306C0.32769 11.8897 0.248535 11.6986 0.248535 11.4993C0.248535 11.3001 0.32769 11.109 0.468586 10.9681L4.93796 6.49997L0.469836 2.0306C0.400071 1.96083 0.344731 1.87801 0.306974 1.78686C0.269218 1.69571 0.249785 1.59801 0.249785 1.49935C0.249785 1.40069 0.269218 1.30299 0.306974 1.21184C0.344731 1.12069 0.400071 1.03786 0.469836 0.968098C0.539601 0.898333 0.622424 0.842993 0.713576 0.805236C0.804728 0.76748 0.902424 0.748047 1.00109 0.748047C1.09975 0.748047 1.19744 0.76748 1.2886 0.805236C1.37975 0.842993 1.46257 0.898333 1.53234 0.968098L6.53234 5.9681C6.60217 6.03786 6.65755 6.12072 6.6953 6.21193C6.73305 6.30313 6.75242 6.4009 6.7523 6.49961C6.75219 6.59832 6.73259 6.69604 6.69462 6.78715C6.65666 6.87827 6.60109 6.961 6.53109 7.0306Z"
															fill="#292C30"
														/>
													</svg>
												</div>
												<WorkationDetail
													locationName={detailInfo.locationName}
													officeName={info.facilityName}
													officeId={info.facilityId}
												/>
											</div>
										) : (
											<div className="markerCnt">
												<div className="facInfo">
													<div
														style={{
															display: 'flex',
															flexDirection: 'column',
															width: '100%',
														}}
													>
														<span className="type">
															{categoryMatch[info.type].type}
														</span>
														<div className="likeCnt">
															<span className="tit">{info.facilityName}</span>

															{isBookmarked && isBookmarked[info.facilityId] ? (
																<HeartFilled
																	onClick={(e) =>
																		onClickLike(e, info.facilityId, info.type)
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
																		onClickLike(e, info.facilityId, info.type)
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
												</div>
											</div>
										))}
								</MapMarker>
						  ))
						: null}
				</MarkerClusterer>
			</div>
		</Map>
	);
}
