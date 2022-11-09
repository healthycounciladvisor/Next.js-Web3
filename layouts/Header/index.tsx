import React, { MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    AppBar,
    Box,
    Button,
    Divider,
    IconButton,
    Menu,
    OutlinedInput,
    Stack,
    Toolbar,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery, gql } from '@apollo/client';
import { signOut, useSession } from 'next-auth/react';
   
type HeaderProps = {
    title: string;
    href: string;
}

const headers = [{
        title: 'Explore',
        href: '/deals',
    }, {
        title: 'Pricing',
        href: '/pricing',
    }, {
        title: 'Affiliation',
        href: '/affiliation',
    }, {
        title: 'Blog',
        href: '/blogs',
    }
]

export default function Header () {
    const { data: session, status } = useSession()
    const  { data, error } = useQuery(gql`
        query get_categories($perPage: Int!)  {
            categories(filter:{}, page: 0, perPage: $perPage, sortField: createdAt, sortOrder:Desc) {
                _id
                createdAt
                deleted {
                    adminId
                    date
                }
                imageUrl
                name
                updatedAt
            }
        }
    `, {
        variables: {
            perPage: 8
        }
    })

    const theme = useTheme();
    const router = useRouter();
    const { c } = router.query
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchUpSm = useMediaQuery(theme.breakpoints.up('sm'));
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <AppBar position="static" 
            sx={{ 
                bgcolor: theme.palette.background.default,
                backgroundImage: 'none',
                boxShadow: 'none',
                border: `1px solid ${theme.palette.divider}`
            }}
        >
            <Toolbar 
                disableGutters 
                sx={{
                    gap: matchUpMd ? 5 : 3,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: matchUpMd ? 9 : matchUpSm ? 5 : 2,
                }}
            >
                <Stack>
                    <Box 
                        component="img"
                        src="/images/logo.png" 
                        onClick={() => router.push('/')}
                        sx={{
                            cursor: 'pointer'
                        }}
                    />
                </Stack>
                <OutlinedInput 
                    size="small"
                    fullWidth
                    startAdornment={<SearchIcon />}
                    placeholder="Search by deal..."
                    sx={{
                        gap: 2,
                        fontWeight: 300,
                        bgcolor: '#222129',
                        '& input::placeholder': {
                            fontStyle: 'italic',
                        }
                    }}
                />
                { matchUpMd ? 
                <>
                {headers.map((item: HeaderProps, key: number) =>
                    <Link
                        key={key}
                        href={item?.href?.toLowerCase()}
                    >
                        <Typography
                            color="text.secondary"
                            sx={{
                                // color: '#F1F2F2',
                                '&:hover': {
                                    color: '#fff'
                                }
                            }}
                        >{item?.title}</Typography>
                    </Link>
                )}
                {!session
                ?
                    <>
                        <Button
                            variant="outlined"
                            sx={{
                                px: 4,
                                whiteSpace: 'nowrap'
                            }}
                            onClick={() => router.push('/login')}
                        >
                            Sign in
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                px: 4,
                                whiteSpace: 'nowrap',
                                background: 'linear-gradient(110.83deg, #AF59CD 12.82%, #0360B7 120.34%)'
                            }}
                            onClick={() => router.push('/register')}
                        >Join us</Button>
                    </>
                :
                    <>
                    <Button
                        variant="outlined"
                        sx={{
                            px: 4,
                            whiteSpace: 'nowrap'
                        }}
                        onClick={() => router.push('/checkout')}
                    >
                        Profile
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            px: 4,
                            whiteSpace: 'nowrap',
                            background: 'linear-gradient(110.83deg, #AF59CD 12.82%, #0360B7 120.34%)'
                        }}
                        onClick={() => signOut()}
                    >Log out</Button>
                    </>
                }
                
                </>
                :
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleOpenUserMenu}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                }
                <Menu
                    sx={{
                        '& .MuiPaper-root': {
                            width: '100%',
                            background: 'rgba(38, 38, 38, 0.84)',
                            backdropFilter: 'blur(10px)',
                            minHeight: '100vh',
                            maxWidth: '100%',
                            maxHeight: '100%',
                            top: '0 !important',
                            left: '0 !important',
                            p: 4,
                            px: matchUpSm ? 4 : 2
                        }
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <Stack 
                        flexDirection="row" 
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Stack flexDirection="row">
                            <Box 
                                component="img"
                                src="/images/logo.png"
                            />
                        </Stack>
                        <CloseIcon 
                            onClick={handleCloseUserMenu}
                            sx={{ 
                                fontSize: 32,
                                cursor: 'pointer'
                            }}
                        />
                    </Stack>
                    <Stack
                        flexDirection="row"
                        sx={{
                            pt: 16
                        }}
                    >
                        <Stack flex={1} gap={5}>
                        {headers.map((ele: HeaderProps, key: number) => 
                            <Typography 
                                variant="subtitle1" 
                                key={key}
                                onClick={() => {handleCloseUserMenu(); router.push('/' + ele?.href?.toLowerCase())}}
                                style={{
                                    cursor: 'pointer'
                                }}
                            >
                                {ele.title}
                            </Typography>
                        )}
                        </Stack>
                        <Stack flex={1}>
                            <Typography variant="subtitle1" sx={{ color: '#8E55FF' }}>Categories</Typography>
                            <Stack flexDirection="row" gap={3}>
                                <Divider 
                                    orientation='vertical'
                                    flexItem
                                />
                                <Stack gap={4}>
                                {data?.categories?.map((item: any, key: number) =>
                                    <Typography
                                        key={key}
                                        variant="caption"
                                        onClick={() => {handleCloseUserMenu(); router.push('/explore?c=' + item?._id)}}
                                        sx={{
                                            cursor: 'pointer',
                                            fontWeight: 500,
                                            textTransform: 'uppercase',
                                            textDecoration: c === item?._id ? 'underline' : 'none',
                                            color: c === item?._id ? '#b075ff' : 'text.secondary'
                                        }}
                                    >{item?.name}</Typography>
                                )}
                                </Stack>
                            </Stack>
                        </Stack>

                    </Stack>
                    <Stack 
                        flexDirection="row"
                        gap={matchUpSm ? 4 : 2}
                        sx={{
                            pt: 25
                        }}
                    >
                        {!session
                        ?
                        <>
                            <Button
                                variant="outlined"
                                fullWidth
                                sx={{
                                    px: 4,
                                    whiteSpace: 'nowrap'
                                }}
                                onClick={() => {handleCloseUserMenu(); router.push('/login')}}
                            >
                                Sign in
                            </Button>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    px: 4,
                                    whiteSpace: 'nowrap',
                                    background: 'linear-gradient(110.83deg, #AF59CD 12.82%, #0360B7 120.34%)'
                                }}
                                onClick={() => { handleCloseUserMenu(); router.push('/register')}}
                            >Join us</Button>
                        </>
                        :
                        <>
                            <Button
                                variant="outlined"
                                fullWidth
                                sx={{
                                    px: 4,
                                    whiteSpace: 'nowrap'
                                }}
                                onClick={() => {handleCloseUserMenu(); router.push('/checkout')}}
                            >
                                Profile
                            </Button>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    px: 4,
                                    whiteSpace: 'nowrap',
                                    background: 'linear-gradient(110.83deg, #AF59CD 12.82%, #0360B7 120.34%)'
                                }}
                                onClick={() => { handleCloseUserMenu(); signOut()}}
                            >Log out</Button>
                        </>
                        }
                        
                    </Stack>
                </Menu>
            </Toolbar>
            <Divider />
            <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    bgcolor: 'rgba(0,0,0,0.26)',
                    display: {
                        md: 'flex',
                        xs: 'none'
                    },
                    px: 9,
                    py: 3
                }}
            >
                <Typography
                    variant="caption"
                    sx={{
                        color: '#FFFFFF',
                        fontWeight: 500
                    }}
                >Categories:</Typography>
                {data?.categories?.map((item: any, key: number) =>
                    <Link 
                        key={key}
                        href={`/deals?c=${item?._id}`} 
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                display: 'block',
                                fontFamily: 'Roboto',
                                fontWeight: 500,
                                textTransform: 'uppercase',
                                textDecoration: c === item?._id ? 'underline' : 'none',
                                color: c === item?._id ? '#b075ff' : "text.secondary",
                                '&:hover': {
                                    transform: 'scaleX(1.1)',
                                }
                            }}
                        >{item?.name}</Typography>
                    </Link>
                )}
            </Stack>
        </AppBar>
    );
}