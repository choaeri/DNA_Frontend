import { useContext } from "react"
import { AppContext } from "../../../../context/AppContext"
import "./LocationMap.css";

export default function LocationMap () {
  const {setMapStep, selectLocation} = useContext(AppContext);

  return (
    <div className="locationDetail">
      <div className="header">
        <svg onClick={() => setMapStep(1)} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M23 13.7104L5.65181 13.7104" stroke="black" strokeWidth="1.5"/>
          <path d="M12.7102 21.4207L4.9999 13.7103L12.7102 6.00004" stroke="black" strokeWidth="1.5"/>
        </svg>
        <span>All</span>
      </div>
      <div className="title">
        <span>{selectLocation}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
          <path d="M5 14.2102L22.3482 14.2102" stroke="black" strokeWidth="1.5"/>
          <path d="M15.2898 6.5L23.0001 14.2103L15.2898 21.9206" stroke="black" strokeWidth="1.5"/>
        </svg>
      </div>
      <div className="detail">
        <div className="item">
          <svg className="detailIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M13.5006 19.1247C13.5006 19.4214 13.4126 19.7114 13.2478 19.9581C13.0829 20.2047 12.8487 20.397 12.5746 20.5105C12.3005 20.6241 11.9989 20.6538 11.7079 20.5959C11.417 20.538 11.1497 20.3951 10.9399 20.1854C10.7301 19.9756 10.5873 19.7083 10.5294 19.4173C10.4715 19.1264 10.5012 18.8248 10.6147 18.5507C10.7283 18.2766 10.9205 18.0423 11.1672 17.8775C11.4139 17.7127 11.7039 17.6247 12.0006 17.6247C12.3984 17.6247 12.7799 17.7827 13.0612 18.064C13.3425 18.3454 13.5006 18.7269 13.5006 19.1247ZM22.464 7.86627C19.5138 5.44664 15.8161 4.12427 12.0006 4.12427C8.185 4.12427 4.48736 5.44664 1.53712 7.86627C1.42294 7.96002 1.32833 8.07535 1.25871 8.20566C1.18909 8.33597 1.14582 8.47872 1.13137 8.62576C1.11692 8.77279 1.13157 8.92124 1.17449 9.06261C1.21741 9.20398 1.28775 9.33552 1.3815 9.44971C1.47525 9.5639 1.59058 9.6585 1.72089 9.72812C1.8512 9.79774 1.99395 9.84101 2.14099 9.85546C2.28802 9.86991 2.43647 9.85526 2.57784 9.81234C2.71921 9.76943 2.85075 9.69908 2.96494 9.60533C5.51272 7.51616 8.70574 6.37441 12.0006 6.37441C15.2954 6.37441 18.4884 7.51616 21.0362 9.60533C21.1504 9.69908 21.2819 9.76943 21.4233 9.81234C21.5647 9.85526 21.7131 9.86991 21.8601 9.85546C22.0072 9.84101 22.1499 9.79774 22.2802 9.72812C22.4105 9.6585 22.5259 9.5639 22.6196 9.44971C22.7134 9.33552 22.7837 9.20398 22.8266 9.06261C22.8696 8.92124 22.8842 8.77279 22.8698 8.62576C22.8553 8.47872 22.812 8.33597 22.7424 8.20566C22.6728 8.07535 22.5782 7.96002 22.464 7.86627ZM19.449 11.216C17.329 9.53766 14.7044 8.62451 12.0006 8.62451C9.2967 8.62451 6.67208 9.53766 4.55212 11.216C4.32411 11.4031 4.17873 11.6723 4.14729 11.9656C4.11585 12.2589 4.20087 12.5529 4.38403 12.7841C4.5672 13.0153 4.83385 13.1653 5.12656 13.2019C5.41927 13.2384 5.71462 13.1585 5.949 12.9794C7.67141 11.6159 9.8038 10.8741 12.0006 10.8741C14.1973 10.8741 16.3297 11.6159 18.0521 12.9794C18.2865 13.1585 18.5819 13.2384 18.8746 13.2019C19.1673 13.1653 19.4339 13.0153 19.6171 12.7841C19.8003 12.5529 19.8853 12.2589 19.8538 11.9656C19.8224 11.6723 19.677 11.4031 19.449 11.216ZM16.4134 14.5591C15.1309 13.6268 13.5861 13.1246 12.0006 13.1246C10.415 13.1246 8.87022 13.6268 7.58775 14.5591C7.34657 14.7349 7.1851 14.9993 7.13886 15.2941C7.09262 15.589 7.1654 15.8901 7.34119 16.1313C7.51698 16.3725 7.78137 16.5339 8.07622 16.5802C8.37106 16.6264 8.67219 16.5536 8.91337 16.3778C9.81057 15.7256 10.8913 15.3742 12.0006 15.3742C13.1098 15.3742 14.1906 15.7256 15.0877 16.3778C15.2072 16.4649 15.3426 16.5275 15.4862 16.5623C15.6298 16.597 15.7789 16.6031 15.9249 16.5802C16.0709 16.5573 16.211 16.5058 16.3371 16.4288C16.4632 16.3518 16.5729 16.2507 16.6599 16.1313C16.747 16.0119 16.8096 15.8765 16.8444 15.7328C16.8791 15.5892 16.8852 15.4401 16.8623 15.2941C16.8394 15.1481 16.7879 15.0081 16.7109 14.882C16.6339 14.7558 16.5328 14.6461 16.4134 14.5591Z" fill="black"/>
          </svg>
          <span className="detailCtn">internet - safety</span>
        </div>
        <div className="item">
          <svg className="detailIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6.01126 13.8561C6.0138 13.9069 6.00599 13.9577 5.98828 14.0054C5.97058 14.0531 5.94336 14.0967 5.90828 14.1335C5.8732 14.1704 5.831 14.1997 5.78423 14.2197C5.73747 14.2397 5.68712 14.25 5.63626 14.2499H1.50001C1.33073 14.2502 1.16634 14.1931 1.03358 14.0881C0.900815 13.9831 0.807483 13.8363 0.76876 13.6715C0.744649 13.5587 0.74576 13.4419 0.772015 13.3296C0.79827 13.2173 0.84902 13.1122 0.920635 13.0218C1.58233 12.1443 2.46028 11.4533 3.46876 11.0165C3.026 10.6128 2.68642 10.1089 2.47846 9.54696C2.27049 8.98505 2.2002 8.38149 2.27346 7.78682C2.34672 7.19216 2.56141 6.6237 2.89955 6.12907C3.23768 5.63444 3.68941 5.22803 4.21691 4.94388C4.74441 4.65973 5.33232 4.50612 5.93139 4.49591C6.53047 4.48569 7.12327 4.61918 7.66015 4.88518C8.19703 5.15118 8.66235 5.54195 9.01715 6.02477C9.37195 6.50758 9.60589 7.06839 9.69938 7.66021C9.71146 7.7398 9.6972 7.82115 9.65879 7.89189C9.62037 7.96262 9.5599 8.01888 9.48657 8.05209C8.44631 8.533 7.56532 9.30144 6.94755 10.2667C6.32977 11.232 6.00099 12.3539 6.00001 13.4999C6.00001 13.6199 6.00001 13.738 6.01126 13.8561ZM23.0738 13.0208C22.4136 12.1443 21.5376 11.4538 20.5313 11.0165C20.974 10.6128 21.3136 10.1089 21.5216 9.54696C21.7295 8.98505 21.7998 8.38149 21.7266 7.78682C21.6533 7.19216 21.4386 6.6237 21.1005 6.12907C20.7623 5.63444 20.3106 5.22803 19.7831 4.94388C19.2556 4.65973 18.6677 4.50612 18.0686 4.49591C17.4696 4.48569 16.8768 4.61918 16.3399 4.88518C15.803 5.15118 15.3377 5.54195 14.9829 6.02477C14.6281 6.50758 14.3941 7.06839 14.3006 7.66021C14.2886 7.7398 14.3028 7.82115 14.3412 7.89189C14.3796 7.96262 14.4401 8.01888 14.5134 8.05209C15.5537 8.533 16.4347 9.30144 17.0525 10.2667C17.6702 11.232 17.999 12.3539 18 13.4999C18 13.6199 18 13.738 17.9888 13.8561C17.9862 13.9069 17.994 13.9577 18.0117 14.0054C18.0294 14.0531 18.0567 14.0967 18.0917 14.1335C18.1268 14.1704 18.169 14.1997 18.2158 14.2197C18.2626 14.2397 18.3129 14.25 18.3638 14.2499H22.5C22.6693 14.2502 22.8337 14.1931 22.9664 14.0881C23.0992 13.9831 23.1925 13.8363 23.2313 13.6715C23.2555 13.5585 23.2544 13.4415 23.228 13.329C23.2015 13.2165 23.1505 13.1112 23.0784 13.0208H23.0738ZM14.73 17.069C15.4768 16.4971 16.0256 15.7055 16.2992 14.8056C16.5729 13.9057 16.5577 12.9427 16.2558 12.0518C15.9538 11.161 15.3804 10.3872 14.6159 9.83912C13.8515 9.29106 12.9345 8.99632 11.9939 8.99632C11.0533 8.99632 10.1364 9.29106 9.37191 9.83912C8.60747 10.3872 8.03399 11.161 7.73206 12.0518C7.43012 12.9427 7.41493 13.9057 7.6886 14.8056C7.96227 15.7055 8.51106 16.4971 9.25782 17.069C7.9327 17.6431 6.8262 18.6264 6.10032 19.8749C6.03449 19.9889 5.99983 20.1183 5.99984 20.2499C5.99985 20.3816 6.03452 20.511 6.10036 20.625C6.16621 20.739 6.26091 20.8337 6.37495 20.8995C6.48899 20.9653 6.61834 20.9999 6.75001 20.9999H17.25C17.3817 20.9999 17.511 20.9653 17.6251 20.8995C17.7391 20.8337 17.8338 20.739 17.8997 20.625C17.9655 20.511 18.0002 20.3816 18.0002 20.2499C18.0002 20.1183 17.9655 19.9889 17.8997 19.8749C17.1723 18.6256 16.0637 17.6422 14.7366 17.069H14.73Z" fill="black"/>
          </svg>
          <span className="detailCtn">Population congestion - general</span>
        </div>
        <div className="item">
          <svg className="detailIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18.75 20.625H15.0684C15.5541 20.1562 16.0763 19.6209 16.5994 19.0191C19.2328 15.9909 20.625 12.7847 20.625 9.75C20.625 7.46251 19.7163 5.26871 18.0988 3.6512C16.4813 2.0337 14.2875 1.125 12 1.125C9.71251 1.125 7.51871 2.0337 5.9012 3.6512C4.2837 5.26871 3.375 7.46251 3.375 9.75C3.375 14.4375 6.57375 18.3694 8.92313 20.625H5.25C4.95163 20.625 4.66548 20.7435 4.4545 20.9545C4.24353 21.1655 4.125 21.4516 4.125 21.75C4.125 22.0484 4.24353 22.3345 4.4545 22.5455C4.66548 22.7565 4.95163 22.875 5.25 22.875H18.75C19.0484 22.875 19.3345 22.7565 19.5455 22.5455C19.7565 22.3345 19.875 22.0484 19.875 21.75C19.875 21.4516 19.7565 21.1655 19.5455 20.9545C19.3345 20.7435 19.0484 20.625 18.75 20.625ZM5.625 9.75C5.625 8.05925 6.29665 6.43774 7.49219 5.24219C8.68774 4.04665 10.3092 3.375 12 3.375C13.6908 3.375 15.3123 4.04665 16.5078 5.24219C17.7034 6.43774 18.375 8.05925 18.375 9.75C18.375 12.8728 16.5 15.6909 14.9344 17.5041C14.0405 18.5308 13.0586 19.4776 12 20.3334C10.9414 19.4776 9.9595 18.5308 9.06562 17.5041C7.5 15.6909 5.625 12.8728 5.625 9.75ZM12 13.875C12.8158 13.875 13.6134 13.6331 14.2917 13.1798C14.9701 12.7266 15.4988 12.0823 15.811 11.3286C16.1232 10.5748 16.2049 9.74542 16.0457 8.94525C15.8866 8.14508 15.4937 7.41008 14.9168 6.83318C14.3399 6.25629 13.6049 5.86342 12.8047 5.70426C12.0046 5.5451 11.1752 5.62679 10.4214 5.939C9.66769 6.25121 9.02345 6.77992 8.57019 7.45827C8.11693 8.13663 7.875 8.93415 7.875 9.75C7.87624 10.8436 8.31124 11.8921 9.08455 12.6654C9.85787 13.4388 10.9064 13.8738 12 13.875ZM12 7.875C12.3708 7.875 12.7334 7.98497 13.0417 8.19099C13.35 8.39702 13.5904 8.68986 13.7323 9.03247C13.8742 9.37508 13.9113 9.75208 13.839 10.1158C13.7666 10.4795 13.588 10.8136 13.3258 11.0758C13.0636 11.338 12.7295 11.5166 12.3658 11.589C12.0021 11.6613 11.6251 11.6242 11.2825 11.4823C10.9399 11.3404 10.647 11.1 10.441 10.7917C10.235 10.4834 10.125 10.1208 10.125 9.75C10.125 9.25272 10.3225 8.77581 10.6742 8.42417C11.0258 8.07254 11.5027 7.875 12 7.875Z" fill="#1D2024"/>
          </svg>
          <span className="detailCtn spot">245 spots</span>
        </div>
      </div>
      <div className="category">
        <ul>
          <li> 
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M16.875 3.12489V17.4999C16.875 17.6656 16.8092 17.8246 16.6919 17.9418C16.5747 18.059 16.4158 18.1249 16.25 18.1249C16.0842 18.1249 15.9253 18.059 15.8081 17.9418C15.6908 17.8246 15.625 17.6656 15.625 17.4999V13.7499H11.875C11.7092 13.7499 11.5503 13.684 11.4331 13.5668C11.3158 13.4496 11.25 13.2906 11.25 13.1249C11.279 11.6278 11.4681 10.138 11.8141 8.68114C12.5781 5.51786 14.0266 3.39754 16.0039 2.55067C16.0989 2.50996 16.2026 2.49346 16.3056 2.50266C16.4086 2.51185 16.5077 2.54645 16.594 2.60335C16.6803 2.66026 16.7512 2.73769 16.8002 2.82871C16.8493 2.91973 16.875 3.02149 16.875 3.12489ZM9.36641 3.02254C9.35417 2.94048 9.32571 2.86167 9.28269 2.79072C9.23967 2.71976 9.18295 2.65809 9.11585 2.60928C9.04874 2.56048 8.97259 2.52553 8.89184 2.50647C8.81108 2.4874 8.72734 2.48461 8.6455 2.49825C8.56365 2.51189 8.48534 2.54169 8.41513 2.58592C8.34492 2.63014 8.28423 2.6879 8.23658 2.75583C8.18893 2.82376 8.15528 2.90049 8.1376 2.98156C8.11992 3.06263 8.11856 3.14641 8.13359 3.22801L8.74141 6.87489H6.875V3.12489C6.875 2.95913 6.80915 2.80016 6.69194 2.68294C6.57473 2.56573 6.41576 2.49989 6.25 2.49989C6.08424 2.49989 5.92527 2.56573 5.80806 2.68294C5.69085 2.80016 5.625 2.95913 5.625 3.12489V6.87489H3.75859L4.36641 3.22801C4.38144 3.14641 4.38008 3.06263 4.3624 2.98156C4.34472 2.90049 4.31107 2.82376 4.26342 2.75583C4.21577 2.6879 4.15507 2.63014 4.08487 2.58592C4.01466 2.54169 3.93635 2.51189 3.8545 2.49825C3.77266 2.48461 3.68892 2.4874 3.60816 2.50647C3.52741 2.52553 3.45126 2.56048 3.38415 2.60928C3.31705 2.65809 3.26033 2.71976 3.21731 2.79072C3.17429 2.86167 3.14583 2.94048 3.13359 3.02254L2.50859 6.77254C2.50298 6.80637 2.50011 6.8406 2.5 6.87489C2.50125 7.76068 2.81556 8.61751 3.3874 9.29399C3.95923 9.97048 4.75178 10.4231 5.625 10.5718V17.4999C5.625 17.6656 5.69085 17.8246 5.80806 17.9418C5.92527 18.059 6.08424 18.1249 6.25 18.1249C6.41576 18.1249 6.57473 18.059 6.69194 17.9418C6.80915 17.8246 6.875 17.6656 6.875 17.4999V10.5718C7.74822 10.4231 8.54077 9.97048 9.1126 9.29399C9.68444 8.61751 9.99875 7.76068 10 6.87489C9.99989 6.8406 9.99701 6.80637 9.99141 6.77254L9.36641 3.02254Z" fill="black"/>
            </svg>
            <span className="item rnt">Restaurant</span>
          </li>       
          <li> 
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M16.25 6.25H2.5C2.33424 6.25 2.17527 6.31585 2.05806 6.43306C1.94085 6.55027 1.875 6.70924 1.875 6.875V10.625C1.87687 11.6891 2.10442 12.7406 2.54264 13.7102C2.98086 14.6799 3.61977 15.5455 4.41719 16.25H2.5C2.33424 16.25 2.17527 16.3158 2.05806 16.4331C1.94085 16.5503 1.875 16.7092 1.875 16.875C1.875 17.0408 1.94085 17.1997 2.05806 17.3169C2.17527 17.4342 2.33424 17.5 2.5 17.5H16.25C16.4158 17.5 16.5747 17.4342 16.6919 17.3169C16.8092 17.1997 16.875 17.0408 16.875 16.875C16.875 16.7092 16.8092 16.5503 16.6919 16.4331C16.5747 16.3158 16.4158 16.25 16.25 16.25H14.3328C15.29 15.4016 16.0159 14.3239 16.4422 13.118C17.236 13.0691 17.9813 12.7193 18.5263 12.14C19.0712 11.5606 19.3747 10.7953 19.375 10V9.375C19.375 8.5462 19.0458 7.75134 18.4597 7.16529C17.8737 6.57924 17.0788 6.25 16.25 6.25ZM18.125 10C18.1247 10.4044 17.9937 10.7978 17.7516 11.1216C17.5094 11.4454 17.169 11.6823 16.7812 11.7969C16.8432 11.4093 16.8745 11.0175 16.875 10.625V7.60781C17.2405 7.73703 17.5569 7.97634 17.7808 8.29281C18.0046 8.60928 18.1249 8.98736 18.125 9.375V10ZM8.75 4.375V1.875C8.75 1.70924 8.81585 1.55027 8.93306 1.43306C9.05027 1.31585 9.20924 1.25 9.375 1.25C9.54076 1.25 9.69973 1.31585 9.81694 1.43306C9.93415 1.55027 10 1.70924 10 1.875V4.375C10 4.54076 9.93415 4.69973 9.81694 4.81694C9.69973 4.93415 9.54076 5 9.375 5C9.20924 5 9.05027 4.93415 8.93306 4.81694C8.81585 4.69973 8.75 4.54076 8.75 4.375ZM11.25 4.375V1.875C11.25 1.70924 11.3158 1.55027 11.4331 1.43306C11.5503 1.31585 11.7092 1.25 11.875 1.25C12.0408 1.25 12.1997 1.31585 12.3169 1.43306C12.4342 1.55027 12.5 1.70924 12.5 1.875V4.375C12.5 4.54076 12.4342 4.69973 12.3169 4.81694C12.1997 4.93415 12.0408 5 11.875 5C11.7092 5 11.5503 4.93415 11.4331 4.81694C11.3158 4.69973 11.25 4.54076 11.25 4.375ZM6.25 4.375V1.875C6.25 1.70924 6.31585 1.55027 6.43306 1.43306C6.55027 1.31585 6.70924 1.25 6.875 1.25C7.04076 1.25 7.19973 1.31585 7.31694 1.43306C7.43415 1.55027 7.5 1.70924 7.5 1.875V4.375C7.5 4.54076 7.43415 4.69973 7.31694 4.81694C7.19973 4.93415 7.04076 5 6.875 5C6.70924 5 6.55027 4.93415 6.43306 4.81694C6.31585 4.69973 6.25 4.54076 6.25 4.375Z" fill="#1D2024"/>
            </svg>
            <span className="item cafe">Cafe</span>
          </li>  
          <li> 
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M17.3664 9.61381L10.4914 0.863807C10.433 0.789392 10.3583 0.729231 10.2732 0.687863C10.1881 0.646495 10.0947 0.625 10 0.625C9.9054 0.625 9.81199 0.646495 9.72686 0.687863C9.64174 0.729231 9.56712 0.789392 9.50864 0.863807L2.63364 9.61381C2.54722 9.72389 2.50024 9.85979 2.50024 9.99974C2.50024 10.1397 2.54722 10.2756 2.63364 10.3857L9.50864 19.1357C9.56712 19.2101 9.64174 19.2703 9.72686 19.3116C9.81199 19.353 9.9054 19.3745 10 19.3745C10.0947 19.3745 10.1881 19.353 10.2732 19.3116C10.3583 19.2703 10.433 19.2101 10.4914 19.1357L17.3664 10.3857C17.4529 10.2756 17.4998 10.1397 17.4998 9.99974C17.4998 9.85979 17.4529 9.72389 17.3664 9.61381ZM10.625 12.1544V3.05678L15.8922 9.7599L10.625 12.1544ZM9.37504 12.1544L4.10786 9.7599L9.37504 3.05678V12.1544ZM9.37504 13.5271V16.9427L5.20082 11.6302L9.37504 13.5271Z" fill="#1D2024"/>
            </svg>
            <span className="item tte">Things to enjoy</span>
          </li>  
          <li> 
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M18.4375 6.67659C18.3205 6.54297 18.1764 6.43582 18.0147 6.36226C17.8531 6.28871 17.6776 6.25045 17.5 6.25003H14.6586L10.4687 1.46331C10.4101 1.39681 10.3379 1.34354 10.2571 1.30706C10.1763 1.27058 10.0887 1.25171 9.99998 1.25171C9.91131 1.25171 9.82365 1.27058 9.74283 1.30706C9.66201 1.34354 9.58988 1.39681 9.53123 1.46331L5.34139 6.25003H2.49998C2.32191 6.25003 2.14589 6.28808 1.98372 6.36163C1.82154 6.43518 1.67695 6.54253 1.55963 6.67649C1.44231 6.81046 1.35497 6.96794 1.30345 7.1384C1.25194 7.30886 1.23743 7.48836 1.26092 7.66487L2.34373 15.7907C2.38387 16.091 2.53173 16.3665 2.75979 16.5659C2.98785 16.7654 3.28059 16.8752 3.58357 16.875H16.4164C16.7194 16.8752 17.0121 16.7654 17.2402 16.5659C17.4682 16.3665 17.6161 16.091 17.6562 15.7907L18.7398 7.66565C18.7629 7.48877 18.7479 7.30898 18.6957 7.13839C18.6436 6.96779 18.5555 6.81033 18.4375 6.67659ZM6.37498 14.375C6.3539 14.3762 6.33278 14.3762 6.3117 14.375C6.15622 14.3758 6.00603 14.3186 5.89046 14.2146C5.7749 14.1106 5.70224 13.9672 5.6867 13.8125L5.2492 9.43753C5.23262 9.2726 5.28224 9.10784 5.38715 8.97949C5.49205 8.85115 5.64364 8.76973 5.80857 8.75315C5.97351 8.73658 6.13827 8.7862 6.26661 8.8911C6.39496 8.99601 6.47637 9.1476 6.49295 9.31253L6.93045 13.6875C6.94795 13.8524 6.89926 14.0174 6.79509 14.1463C6.69092 14.2752 6.53981 14.3575 6.37498 14.375ZM10.625 13.75C10.625 13.9158 10.5591 14.0748 10.4419 14.192C10.3247 14.3092 10.1657 14.375 9.99998 14.375C9.83422 14.375 9.67525 14.3092 9.55804 14.192C9.44083 14.0748 9.37498 13.9158 9.37498 13.75V9.37503C9.37498 9.20927 9.44083 9.0503 9.55804 8.93309C9.67525 8.81588 9.83422 8.75003 9.99998 8.75003C10.1657 8.75003 10.3247 8.81588 10.4419 8.93309C10.5591 9.0503 10.625 9.20927 10.625 9.37503V13.75ZM7.00232 6.25003L9.99998 2.82425L12.9976 6.25003H7.00232ZM14.7469 9.43753L14.3094 13.8125C14.2939 13.9666 14.2218 14.1094 14.107 14.2133C13.9923 14.3172 13.8431 14.3748 13.6883 14.375C13.6672 14.3762 13.6461 14.3762 13.625 14.375C13.5433 14.3668 13.4641 14.3426 13.3918 14.3038C13.3194 14.2649 13.2555 14.2122 13.2036 14.1487C13.1516 14.0851 13.1127 14.012 13.089 13.9334C13.0654 13.8548 13.0574 13.7723 13.0656 13.6907L13.5031 9.31565C13.5197 9.15072 13.6011 8.99913 13.7294 8.89423C13.8578 8.78932 14.0225 8.7397 14.1875 8.75628C14.3524 8.77286 14.504 8.85427 14.6089 8.98262C14.7138 9.11096 14.7634 9.27572 14.7469 9.44065V9.43753Z" fill="#1D2024"/>
            </svg>
            <span className="item mart">Mart</span>
          </li>  
          <li> 
            <span className="item wkn">Workation</span>
          </li>
        </ul>
      </div>
    </div>
  )
}