import * as React from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { NavLink } from "react-router-dom"

export default function RegisterButton() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Register
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <NavLink to='/auth/sign-up-patient'>
          <MenuItem onClick={handleClose}>Patient</MenuItem>
        </NavLink>
        <NavLink to='/auth/sign-up-doctor'>
          <MenuItem onClick={handleClose}>Doctor</MenuItem>
        </NavLink>
      </Menu>
    </div>
  )
}
