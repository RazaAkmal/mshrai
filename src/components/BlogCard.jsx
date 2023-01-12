import React from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../i18n";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import LoadingComponent from "./LoadingComponent";
import logo from "../images/logo-min.png";
const BlogCard = ({ item, showDetails, selectedLng }) => {
  const { t, i18n } = useTranslation();
  const showImage = (link) => {
    if (link.includes("default.jpg")) {
      return false;
    }
    return true;
  };
  if (!item) return <LoadingComponent />;
  return (
    <Link to={`/blogs/${item?.id}`} className="blog__card__link ">
      <Card style={{ width: "100%" }}>
        {!showImage(item?.image) ? (
          <div
            className={`image-blog-wrapper ${showDetails ? "img-full" : null} `}
            // style={{ backgroundColor: "#3e0292" }}
          >
            <Card.Img variant="top" src={logo} className="blog-logo" />
          </div>
        ) : (
          <div
            className={`image-blog-wrapper ${showDetails ? "img-full" : null}`}
          >
            <Card.Img variant="top" src={item?.image} />
          </div>
        )}
        {/* <div
          className={`image-blog-wrapper ${showDetails ? "img-full" : null}`}
        >
          <Card.Img variant="top" src={item?.image} />
        </div> */}

        <Card.Body>
          <Card.Title>
            {selectedLng === "ar" ? item?.title : item?.title_en}
          </Card.Title>
          {!showDetails && (
            <>
              {/* <Card.Text>{item?.description.substr(0, 35)}...</Card.Text> */}
              <div className="my-2">
                {selectedLng === "ar" ? "تصنيف" : "category"}
                <Badge bg="primary" className="mx-2">
                  {selectedLng === "ar"
                    ? item?.category.title
                    : item?.category.title_en}
                </Badge>
                <Card.Text border-bottom>
                  {selectedLng === "ar" ? "كتبت بواسطة" : "Written By"}{" "}
                  {item?.user?.name}
                </Card.Text>
              </div>
              <Button variant="" className="details-btn">
                {t("blogCard.details")}
              </Button>
            </>
          )}
          {showDetails && (
            <>
              <div className="my-2 border-bottom">
                {selectedLng === "ar" ? "تصنيف" : "category"}
                <Badge bg="primary" className="mx-2">
                  {selectedLng === "ar"
                    ? item?.category?.title
                    : item?.category?.title_en}
                </Badge>
                <Card.Text className="my-2 border-bottom ">
                  {selectedLng === "ar" ? "كتبت بواسطة" : "Written By"}
                  {item?.user?.name}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center border-bottom">
                  <span>{item?.user?.email}</span>
                  <span>{item?.user?.phone}</span>
                </div>
              </div>
              <Card.Text className="my-2 d-flex justify-content-between align-items-center border-bottom">
                <span>created at</span>{" "}
                <span>{new Date(item?.created_at).toLocaleDateString()} </span>
              </Card.Text>
              <Card.Text className="my-2 d-flex justify-content-between border-bottom">
                <span>updated at</span>{" "}
                <span>{new Date(item?.updated_at).toLocaleDateString()} </span>
              </Card.Text>

              <Card.Text
                dangerouslySetInnerHTML={{ __html: item?.description }}
              />
            </>
          )}
        </Card.Body>
      </Card>
    </Link>
  );
};

export default BlogCard;
