"use client";
import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { usePathname, useRouter } from "next/navigation";

const tiers = [
  {
    title: "일주일 이용권",
    price: "3,300",
    description: [
      "데이트 코스 추천 무제한",
      "일단 사봐",
      "좋을껄?",
      "계속 서비스 추가될거야",
    ],
    buttonText: "결제하기",
    buttonVariant: "outlined",
  },
  {
    title: "한달 이용권",
    price: "9,900",
    description: [
      "데이트 코스 추천 무제한",
      "이정도론 호구아님 사봐",
      "아마 좋을껄?",
      "계속 서비스 추가될거야",
    ],
    buttonText: "결제하기",
    buttonVariant: "contained",
  },
  {
    title: "일년 이용권",
    price: "55,000",
    description: [
      "데이트 코스 추천 무제한",
      "일단 사봐(호구아님)",
      "후후후후 제발",
      "계속 서비스 추가될거야",
    ],
    buttonText: "결제하기",
    buttonVariant: "outlined",
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Pricing() {
  const pathname = usePathname();
  const router = useRouter();

  const goToPaymentPage = (selectedTier) => {
    const title = encodeURIComponent(selectedTier.title);
    const price = encodeURIComponent(selectedTier.price);
    const description = encodeURIComponent(
      JSON.stringify(selectedTier.description)
    );

    router.push(
      `/payment?title=${title}&price=${price}&description=${description}`
    );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          VIP 정기권 구매
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          싸다싸
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      {tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      원
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    onClick={() => goToPaymentPage(tier)} // 버튼을 클릭하면 선택한 상품 정보를 넘김
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
