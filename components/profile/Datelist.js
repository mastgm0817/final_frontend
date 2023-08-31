import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ElectricMopedTwoToneIcon from "@mui/icons-material/ElectricMopedTwoTone";
import LocalCarWashTwoToneIcon from "@mui/icons-material/LocalCarWashTwoTone";
import FlightTakeoffTwoToneIcon from "@mui/icons-material/FlightTakeoffTwoTone";
import TwoWheelerTwoToneIcon from "@mui/icons-material/TwoWheelerTwoTone";
import FestivalTwoToneIcon from "@mui/icons-material/FestivalTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";

const API_URL = process.env.NEXT_PUBLIC_URL;

function getRandomIcon() {
  const icons = [
    <ElectricMopedTwoToneIcon key="ElectricMoped" />,
    <LocalCarWashTwoToneIcon key="LocalCarWash" />,
    <FlightTakeoffTwoToneIcon key="FlightTakeoff" />,
    <TwoWheelerTwoToneIcon key="TwoWheeler" />,
    <FestivalTwoToneIcon key="Festival" />,
  ];
  const randomIndex = Math.floor(Math.random() * icons.length);
  return icons[randomIndex];
}

function Datelist({ title }) {
  const [wishlist, setWishlist] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const { data: session } = useSession();
  const authToken = session.user.id;
  const nickName = session.user.name;

  const fetchWishlist = async () => {
    if (!session || !session.user) {
      alert("로그인을 먼저 해주세요.");
      return;
    }
    try {
      const response = await axios.get(API_URL + `/wishlist/${nickName}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(JSON.stringify(wishlist, null, 2));
      setWishlist(response.data);
      setShowWishlist(true);
    } catch (error) {
      console.error("Wishlist를 불러오는 중에 에러가 발생했습니다:", error);
    }
  };

  const deleteCourse = async (nickName, courseIndex) => {
    try {
      // 삭제할 데이트 코스의 정보
      const targetCourse = chunkedWishlist[courseIndex];

      // 백엔드와 통신
      await axios.post(
        API_URL + "/deleteCourse",
        {
          nickName,
          targetCourse,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // 성공적으로 삭제됐다면, 상태 업데이트
      const updatedWishlist = wishlist.filter(
        (item) => !targetCourse.includes(item)
      );
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error("삭제 중 에러 발생:", error);
    }
  };

  const toggleItems = (startIndex) => {
    if (showToggleIndex === startIndex) {
      setShowToggleIndex(null);
    } else {
      setShowToggleIndex(startIndex);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const chunkArray = (arr, chunk_size) => {
    let results = [];

    while (arr.length) {
      results.push(arr.splice(0, chunk_size));
    }

    return results;
  };

  const chunkedWishlist = chunkArray([...wishlist], 5);

  return (
    <>
      <Box sx={{ minWidth: 275 }}>
        <Card>
          <React.Fragment>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="#f783ac" gutterBottom>
                {title}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowWishlist(!showWishlist)}
              >
                나의찜목록
              </Button>
              {showWishlist &&
                (wishlist.length > 0 ? (
                  chunkedWishlist.map((chunk, idx) => (
                    <Accordion key={idx}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${idx + 1}-content`}
                        id={`panel${idx + 1}-header`}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {getRandomIcon()}{" "}
                          {/* 이 위치에 랜덤 아이콘을 삽입합니다. */}
                          <Typography
                            style={{ marginLeft: "8px" }}
                          >{`데이트 코스 ${idx + 1}`}</Typography>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        {chunk.map((item, index) => (
                          <Box key={index} sx={{ minWidth: 275 }}>
                            <Card>
                              <CardContent>
                                <Typography
                                  sx={{ fontSize: 14 }}
                                  color="#f783ac"
                                  gutterBottom
                                >
                                  {item["사업장명"]}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  주소: {item["소재지전체주소"]}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  업태: {item["업태구분명"]}
                                </Typography>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    style={{ display: "inline-block" }}
                                  >
                                    맛: {item["맛"]}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    style={{ display: "inline-block" }}
                                  >
                                    서비스: {item["서비스"]}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    style={{ display: "inline-block" }}
                                  >
                                    분위기: {item["분위기"]}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    style={{ display: "inline-block" }}
                                  >
                                    친절도: {item["친절도"]}
                                  </Typography>
                                </div>
                              </CardContent>
                            </Card>
                          </Box>
                        ))}
                        <DeleteForeverTwoToneIcon
                          onClick={() => deleteCourse(nickName, idx)}
                        />{" "}
                      </AccordionDetails>
                    </Accordion>
                  ))
                ) : (
                  <div>찜목록이 비어있습니다.</div>
                ))}
            </CardContent>
          </React.Fragment>
        </Card>
      </Box>
    </>
  );
}

export default Datelist;
