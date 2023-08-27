import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Image from "next/image";

export default function CouponInfo({
  code,
  content,
  discountValue,
  discountType,
  assignedAt,
  endAt,
}) {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code).then(
      () => {
        alert("쿠폰 번호가 클립보드에 복사되었습니다.");
      },
      (err) => {
        alert("쿠폰 번호를 복사하는데 실패했습니다.", err);
      }
    );
  };
  let imageSrc;
  if (content === "회원가입축하쿠폰") {
    imageSrc = "./image/cImgSignup.png";
  } else if (discountType === "PERCENTAGE") {
    imageSrc = `./image/${discountValue}per.png`;
  } else {
    imageSrc = `./image/${discountValue}.png`;
  }
  return (
    <Card sx={{ width: 320, maxWidth: "100%", boxShadow: "lg" }}>
      <CardOverflow>
        <AspectRatio objectFit="contain" sx={{ minWidth: 200 }}>
          <Image
            src={imageSrc} // 동적으로 설정된 src를 사용
            alt="CouponImage"
            width={400} // Desired size
            height={200} // Desired size
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Link
          href="#product-card"
          fontWeight="md"
          color="neutral"
          textColor="text.primary"
          overlay
          endDecorator={<ArrowOutwardIcon />}
        >
          {content}
        </Link>

        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: "xl" }}
          endDecorator={
            <Chip component="span" size="sm" variant="soft" color="success">
              {discountValue}%
            </Chip>
          }
        >
          {code}
        </Typography>
        <Typography level="body-xs">할당 일자: {assignedAt}</Typography>
        <Typography level="body-xs">만료 일자: {endAt}</Typography>
      </CardContent>
      <CardOverflow>
        <Button
          variant="solid"
          color="danger"
          size="lg"
          onClick={handleCopyCode}
        >
          쿠폰번호 복사하기
        </Button>
      </CardOverflow>
    </Card>
  );
}
