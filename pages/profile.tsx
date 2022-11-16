import {
  Box,
  Button,
  OutlinedInput,
  Stack,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import HomeContainer from "../components/containers/HomeContainer";
import ExplorerPattern from "../components/patterns/ExplorerPattern";
import { useQuery, gql } from "@apollo/client";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Layout from "../layouts";
import DealCard from "../components/cards/DealCard";
import { GET_DEALS, GET_MY_ORDERS } from "../gql/deals";

const Profile = () => {
  const theme = useTheme();
  const matchUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();
  const { c } = router.query;
  const { data: orders } = useQuery( GET_MY_ORDERS );
  const { data: deals } = useQuery(GET_DEALS);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <HomeContainer>
        <Box
          sx={{
            pt: 6,
            pb: 24,
          }}
        >
          <Stack pb={12}>
            <Stack flexDirection="row">
              <Box
                component="img"
                src="/images/spark.png"
                sx={{
                  position: "relative",
                  left: -20,
                }}
              />
            </Stack>
            <Stack gap={1}>
              <Typography variant="h4">Hello 👋</Typography>
              <Typography color="text.secondary" maxWidth={600}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </Typography>
            </Stack>
          </Stack>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Roboto",
              fontWeight: 700,
            }}
          >
            {orders?.getMyOrders?.length ?? 0} Deals Redeemed
          </Typography>
          <Stack
            flexDirection={matchUpMd ? "row" : "column"}
            justifyContent="space-between"
            alignItems={matchUpMd ? "center" : "flex-start"}
            gap={5}
            sx={{
              pb: 11,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: "italic" }}
            >
              {data && data.deals && data.deals.length
                ? `${data.deals.length} Deals Available`
                : "No Deals Available"}
            </Typography>
            <Stack
              flexDirection={matchUpSm ? "row" : "column"}
              justifyContent={matchUpMd ? "inherit" : "space-between"}
              gap={matchUpMd ? 8 : 4}
            >
              <Stack
                flexDirection={matchUpMd ? "row" : "column"}
                alignItems={matchUpMd ? "center" : "flex-start"}
                gap={matchUpMd ? 2 : 0.5}
              >
                <Typography variant="body2" color="text.secondary">
                  Order By:
                </Typography>
                <Select native size="small" onClick={handleOrder}>
                  <option value="1">Most recent first</option>
                  <option value="2">A - Z first</option>
                  <option value="3">Z - A first</option>
                </Select>
              </Stack>
            </Stack>
          </Stack>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            // ) : data && data.deals && data.deals.length ? (
            //   <Box
            //     sx={{
            //       display: "grid",
            //       gridTemplateColumns: matchUpLg
            //         ? "repeat(3, 1fr)"
            //         : matchUpMd
            //         ? "repeat(2, 1fr)"
            //         : "repeat(1, 1fr)",
            //       rowGap: matchUpLg ? 6 : 3,
            //       columnGap: matchUpLg ? 8 : 4,
            //     }}
            //   >
            //     {data.deals.map((element: any, key: number) => (
            //       <DealCard key={key} {...element} />
            //     ))}
            //   </Box>
            // ) : (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                py: 30,
              }}
            >
              <Stack gap={5}>
                <Stack gap={2}>
                  <Typography variant="h1">
                    Sorry, No Result found ☹️
                  </Typography>
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                  >
                    We’re sorry what you’re looking for; please try another way
                  </Typography>
                </Stack>
                <Stack flexDirection="row">
                  <Button variant="outlined" onClick={() => router.push("/")}>
                    Back to Home
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          )}
        </Box>
      </HomeContainer>
      <ExplorerPattern />
    </Box>
  );
};

Profile.layout = Layout;

export default Profile;
