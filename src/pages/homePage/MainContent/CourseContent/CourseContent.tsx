import { Box } from "@mui/material";
import styles from "./CourseContent.module.scss";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarHalfIcon from "@mui/icons-material/StarHalf";

interface ICourse {
    id: number,
    courseName: string,
    price: number,
    thumbnail: string,
    isFree: null,
    weeklyViews: number,
    monthlyViews: number,
    creatorId: string,
    createName: string,
    createPicture: string,
}

const CourseContent = ({props}: {props: ICourse}) => {
    return (
        <Box className={styles.content}>
            <Box className={styles.wrapper}>
                <img
                    className={styles.pic}
                    src="//img-c.udemycdn.com/course/240x135/1565838_e54e_18.jpg"
                    alt=""
                />
                <Box className={styles.body}>
                    <a
                        className={styles.courseLink}
                        href="/course/the-complete-web-development-bootcamp/"
                    >
                        The Complete 2024 Web Development Bootcamp
                    </a>
                    <p className={styles.title}>Dr. Angela Yu</p>
                    <div className={styles.ratingWrapper}>
                        <span className={styles.rating}>
                            4.7
                            <StarRateIcon className={styles.icon} />
                            <StarRateIcon className={styles.icon} />
                            <StarRateIcon className={styles.icon} />
                            <StarRateIcon className={styles.icon} />
                            <StarHalfIcon className={styles.icon} />
                        </span>
                        <span className="numberStar">(370,716)</span>
                    </div>
                    <div className={styles.priceWrapper}>
                        <strong className={styles.price}>₫299,000</strong>
                        <span className={styles.delPrice}>
                            <del>₫1,599,000</del>
                        </span>
                    </div>
                    <span className={styles.btn}>Bestseler</span>
                </Box>
            </Box>
        </Box>
    );
};

export default CourseContent;
