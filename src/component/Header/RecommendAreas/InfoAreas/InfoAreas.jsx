import AddSchedule from '../../../DetailLocation/LocationInfo/AddSchedule/AddSchedule';
import './InfoAreas.css';
import { useNavigate } from 'react-router-dom';

export default function InfoAreas(props) {
	const navigate = useNavigate();

	const handleBack = () => {
		if (props.step > 0) {
			props.setStep(props.step - 1);
		}
	};

	const handleNext = () => {
		if (props.step < props.recommendedArea.length - 1) {
			props.setStep(props.step + 1);
		}
	};

	const currentArea = props.recommendedArea[props.step];

	return (
		<>
			{props.recommendedArea ? (
				<div className="InfoAreas">
					<div className="stepCnt">
						<svg
							className="backBtn"
							onClick={handleBack}
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
						>
							<path
								d="M10 13.2012L5.2 8.40117L10 3.60117"
								stroke={props.step > 0 ? '#808388' : '#E1E4E9'}
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<span>
							{props.step + 1} / {props.recommendedArea.length}
						</span>
						<svg
							className="nextBtn"
							onClick={handleNext}
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
						>
							<path
								d="M5.99609 13.2012L10.7961 8.40117L5.99609 3.60117"
								stroke={
									props.step < props.recommendedArea.length - 1
										? '#808388'
										: '#E1E4E9'
								}
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
					<div className="infoCnt">
						<div className="tit">
							<span>{currentArea.locationName}</span>
							<svg
								onClick={() => navigate(`/locations/${currentArea.locationId}`)}
								xmlns="http://www.w3.org/2000/svg"
								width="28"
								height="28"
								viewBox="0 0 28 28"
								fill="none"
							>
								<path
									d="M5 13.7109L22.3482 13.7109"
									stroke="black"
									strokeWidth="1.5"
								/>
								<path
									d="M15.29 6L23.0003 13.7103L15.29 21.4206"
									stroke="black"
									strokeWidth="1.5"
								/>
							</svg>
						</div>
						<div className="label">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
							>
								<path
									d="M15.24 4.76161C15.1272 4.66327 14.9877 4.60066 14.8393 4.58174C14.6908 4.56282 14.5401 4.58845 14.4062 4.65536L11.2681 6.21786L8.64812 1.86599C8.58077 1.75432 8.48571 1.66194 8.37216 1.59782C8.2586 1.53369 8.13041 1.5 8 1.5C7.86959 1.5 7.74139 1.53369 7.62784 1.59782C7.51428 1.66194 7.41922 1.75432 7.35187 1.86599L4.73187 6.21974L1.595 4.65724C1.46146 4.59092 1.31131 4.56552 1.16339 4.58422C1.01547 4.60293 0.876369 4.6649 0.763543 4.76237C0.650717 4.85984 0.569193 4.98847 0.5292 5.1321C0.489208 5.27574 0.492529 5.42798 0.538747 5.56974L2.85125 12.6547C2.8745 12.7259 2.91344 12.791 2.96519 12.8451C3.01695 12.8992 3.0802 12.941 3.15027 12.9674C3.22034 12.9938 3.29545 13.0041 3.37004 12.9976C3.44463 12.9911 3.51681 12.9679 3.58125 12.9297C3.59687 12.9204 5.195 11.9997 8 11.9997C10.805 11.9997 12.4031 12.9204 12.4175 12.9291C12.482 12.9676 12.5543 12.9911 12.629 12.9979C12.7038 13.0046 12.7792 12.9944 12.8495 12.9681C12.9198 12.9417 12.9832 12.8999 13.0352 12.8456C13.0871 12.7914 13.1261 12.7261 13.1494 12.6547L15.4619 5.57161C15.5094 5.42982 15.5137 5.27709 15.4742 5.13285C15.4347 4.98861 15.3532 4.85938 15.24 4.76161ZM10.99 9.79974C10.9696 9.9154 10.9091 10.0202 10.8192 10.0957C10.7292 10.1713 10.6156 10.2127 10.4981 10.2129C10.4688 10.2128 10.4395 10.2103 10.4106 10.2054C8.81355 9.93119 7.18144 9.93119 5.58437 10.2054C5.5197 10.2168 5.45341 10.2153 5.38929 10.2011C5.32517 10.1869 5.26448 10.1602 5.21068 10.1225C5.10202 10.0465 5.02804 9.93036 5.005 9.79974C4.98196 9.66912 5.01175 9.5347 5.08782 9.42604C5.16389 9.31739 5.28 9.2434 5.41062 9.22036C7.12266 8.9262 8.87233 8.9262 10.5844 9.22036C10.6493 9.23147 10.7114 9.25529 10.767 9.29045C10.8227 9.32561 10.8709 9.37142 10.9088 9.42526C10.9467 9.47909 10.9736 9.53988 10.988 9.60415C11.0024 9.66841 11.0039 9.73488 10.9925 9.79974H10.99Z"
									fill="white"
								/>
							</svg>
							<span>The Best place to you </span>
						</div>
						<div className="keyword">
							{currentArea.keyword.split(', ').map((obj, idx) => {
								return <span key={idx}>{obj}</span>;
							})}
						</div>
						<div className="desp">
							<span>{currentArea.description}</span>
						</div>
						<AddSchedule />
					</div>
				</div>
			) : null}
		</>
	);
}
