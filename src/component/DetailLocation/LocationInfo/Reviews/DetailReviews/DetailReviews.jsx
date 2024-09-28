import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../../context/AppContext';
import './DetailReviews.css';
import { Modal } from '@mui/material';
import { axiosInstance } from '../../../../../common/func/axios';
import { dataMatch } from '../../../../../common/func/match';

export default function DetailReviews() {
	const { errMessageCheck, 
					openReviewModal, setOpenReviewModal, 
					detailInfo } = useContext(AppContext);
	const [reviews, setReviews] = useState([]);
	const [ratingDistribution, setRatingDistribution] = useState({
		1: 0, 2: 0, 3: 0, 4: 0, 5: 0
	});

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const res = await axiosInstance.get(
					`/api/public/locations/${detailInfo.locationId}/workation-reviews`,
					{
						params: {
							page: 0,
							size: 7,
							sort: 'createdAt,desc',
						},
					}
				);
				const data = res.data;
				if (data && Array.isArray(data.content)) {
					setReviews(data.content);
					calculateRatingDistribution(data.content);
				} else {
					console.error('Fetched data is not an array:', data);
				}
			} catch (err) {
				errMessageCheck(err.response.data.errorMessage);
			}
		};
		fetchReviews();
	}, [detailInfo, errMessageCheck]);

	const renderStars = (rating) => {
		const stars = [];
		for (let i = 0; i < rating; i++) {
			stars.push(
				<span key={i} className={i < rating ? 'filledStar' : 'emptyStar'}>
					★
				</span>
			);
		}
		return stars;
	};

	const calculateRatingDistribution = (reviewsData) => {
		const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
		reviewsData.forEach(review => {
			distribution[review.rating] = (distribution[review.rating] || 0) + 1;
		});
		setRatingDistribution(distribution);
	};

	const renderRatingDistribution = () => {
		const maxCount = Math.max(...Object.values(ratingDistribution));
		return (
			<div className="ratingDistribution">
				{[5, 4, 3, 2, 1].map(rating => (
					<div key={rating} className="ratingBar">
						<span className="ratingLabel">{rating}</span>
						<div className="barContainer">
							<div
								className="bar"
								style={{
									width: `${(ratingDistribution[rating] / maxCount) * 100}%`
								}}
							></div>
						</div>
					</div>
				))}
			</div>
		);
	};

	return (
		<Modal open={openReviewModal} onClose={() => setOpenReviewModal(false)}>
			<section className="dtrSection">
				<div className="dtrModal">
					<div className="dtrHeader">
						<span>Reviews</span>
						<svg
							className="closeBtn"
							onClick={() => setOpenReviewModal(false)}
							xmlns="http://www.w3.org/2000/svg"
							width="40"
							height="40"
							viewBox="0 0 40 40"
							fill="none"
						>
							<path
								d="M12.929 13.0713L27.0711 27.2134"
								stroke="black"
								strokeWidth="2"
							/>
							<path
								d="M27.071 13.0713L12.9289 27.2134"
								stroke="black"
								strokeWidth="2"
							/>
						</svg>
					</div>
					<div className="dtrCnt">
						<div className="leftCnt">
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="28"
									height="29"
									viewBox="0 0 28 29"
									fill="none"
								>
									<path
										d="M25.6484 13.0101L20.7156 17.3151L22.1932 23.7245C22.2714 24.0595 22.2491 24.4102 22.1291 24.7327C22.009 25.0551 21.7966 25.335 21.5184 25.5374C21.2401 25.7398 20.9084 25.8557 20.5647 25.8705C20.2209 25.8854 19.8804 25.7986 19.5857 25.621L13.9956 22.2304L8.41744 25.621C8.12275 25.7986 7.78225 25.8854 7.4385 25.8705C7.09476 25.8557 6.76302 25.7398 6.48478 25.5374C6.20653 25.335 5.99411 25.0551 5.87408 24.7327C5.75406 24.4102 5.73175 24.0595 5.80994 23.7245L7.28541 17.3217L2.3515 13.0101C2.09054 12.785 1.90184 12.4879 1.80906 12.156C1.71628 11.8242 1.72356 11.4723 1.82997 11.1445C1.93638 10.8167 2.1372 10.5277 2.40724 10.3136C2.67727 10.0995 3.00451 9.96989 3.34791 9.94103L9.85135 9.37775L12.3899 3.32275C12.5225 3.00503 12.7461 2.73364 13.0326 2.54275C13.3191 2.35186 13.6557 2.25 13.9999 2.25C14.3442 2.25 14.6808 2.35186 14.9673 2.54275C15.2538 2.73364 15.4774 3.00503 15.6099 3.32275L18.1562 9.37775L24.6574 9.94103C25.0008 9.96989 25.3281 10.0995 25.5981 10.3136C25.8681 10.5277 26.069 10.8167 26.1754 11.1445C26.2818 11.4723 26.2891 11.8242 26.1963 12.156C26.1035 12.4879 25.9148 12.785 25.6538 13.0101H25.6484Z"
										fill="black"
									/>
								</svg>
								<span>
									{detailInfo.averageRating === 0 ? detailInfo.averageRating.toFixed(0) : detailInfo.averageRating.toFixed(2)}({detailInfo.reviewCount})
								</span>
							</div>
							{renderRatingDistribution()}
						</div>
						<div className="line"></div>
						<div className="rightCnt">
							<span className='count'>All {reviews.length}</span>
							{reviews.map((review, index) => (
								<div key={index} className="reviewItem">
									<div className="reviewUser">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
										>
											<path
												d="M17.0769 11.0769C17.0769 12.081 16.7792 13.0626 16.2213 13.8975C15.6634 14.7324 14.8705 15.3831 13.9429 15.7674C13.0152 16.1516 11.9944 16.2522 11.0095 16.0563C10.0247 15.8604 9.1201 15.3769 8.41008 14.6668C7.70006 13.9568 7.21653 13.0522 7.02063 12.0674C6.82474 11.0826 6.92528 10.0618 7.30954 9.13407C7.6938 8.20638 8.34452 7.41347 9.17942 6.85561C10.0143 6.29776 10.9959 6 12 6C13.346 6.00153 14.6365 6.5369 15.5882 7.48868C16.54 8.44046 17.0754 9.73091 17.0769 11.0769ZM24 12C24 14.3734 23.2962 16.6934 21.9776 18.6668C20.6591 20.6402 18.7849 22.1783 16.5922 23.0865C14.3995 23.9948 11.9867 24.2324 9.65892 23.7694C7.33115 23.3064 5.19295 22.1635 3.51472 20.4853C1.83649 18.807 0.693605 16.6689 0.230582 14.3411C-0.232441 12.0133 0.00519941 9.60051 0.913451 7.4078C1.8217 5.21508 3.35977 3.34094 5.33316 2.02236C7.30655 0.703788 9.62663 0 12 0C15.1816 0.00335979 18.2319 1.26872 20.4816 3.51843C22.7313 5.76814 23.9966 8.81843 24 12ZM22.1538 12C22.1524 10.6333 21.8753 9.28095 21.3392 8.0238C20.803 6.76665 20.0189 5.63053 19.0336 4.68338C18.0484 3.73624 16.8822 2.99753 15.6049 2.51142C14.3275 2.02531 12.9653 1.80179 11.5996 1.85423C6.165 2.06423 1.83116 6.59077 1.84616 12.0288C1.85137 14.5044 2.76441 16.8922 4.41231 18.7396C5.08342 17.7662 5.9359 16.9314 6.92308 16.2808C7.00725 16.2252 7.10731 16.1987 7.20795 16.2054C7.3086 16.212 7.40429 16.2515 7.48039 16.3177C8.73483 17.4027 10.338 17.9998 11.9965 17.9998C13.6551 17.9998 15.2583 17.4027 16.5127 16.3177C16.5888 16.2515 16.6845 16.212 16.7851 16.2054C16.8858 16.1987 16.9858 16.2252 17.07 16.2808C18.0584 16.931 18.9121 17.7659 19.5842 18.7396C21.2403 16.8854 22.1551 14.4861 22.1538 12Z"
												fill="black"
											/>
										</svg>
										<span>{review.username}</span>
									</div>
									<div className="reviewInfo">
										<div className="reviewRating">
											{renderStars(review.rating)}
										</div>
										<span>
											{dataMatch[review.createdAt[1]]} {review.createdAt[0]}
										</span>
									</div>
									<div className="reviewContent">{review.content}</div>
									<div className="reviewAuthor">{review.author}</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</Modal>
	);
}
