import * as React from 'react'
import styles from './styles/MenuModal.module.scss'
import { DrawerModal } from '../components/DrawerModal'
import { usePopupShown, useModalStatus, transformStyles, useModal } from '@react-kits/dom'
import { LoginModal } from './LoginModal'

import { userSlice, accountAsyncAction, accountSelector } from '@smoex-logic/user'

const cx = transformStyles(styles)

const AccountIntro = (props: any) => {
  const { showLogin, onCloseModal } = props
  const [account = {}] = userSlice.useSelector(accountSelector.info)
  const [logout] = userSlice.useAction(accountAsyncAction.logout)
  const onAvatarClick = React.useCallback(() => {
    if (account.group === 'visitor') {
      showLogin()
    }
  }, [account.group])
  const onLogout = () => {
    logout()
    onCloseModal()
  }
  return (
    <div className={cx('account-intro')}>
      <div className={cx('intro-avatar')} onClick={onAvatarClick}>
        Avatar
      </div>
      {account.group === 'visitor' && (
        <div className={cx('intro-login')} onClick={showLogin}>
          TO LOGIN
        </div>
      )}
      {account.group === 'guest' && (
        <div className={cx('intro-complate')}>TO COMPLATED</div>
      )}
      {account.group === 'member' && (
        <div className={cx('intro-nickname')}>
          {account.nickname || account.username}
        </div>
      )}
      {(account.group === 'guest' || account.group === 'member') && (
        <div className={cx('intro-logout')} onClick={onLogout}>
          LOGOUT
        </div>
      )}
      {!account.group && <div>SERVER ERROR</div>}
      {!account.group && <div onClick={showLogin}>TEST FOR LOGIN</div>}
    </div>
  )
}

export const MenuModal: React.FC<any> = (props) => {
  const { uuid } = props
  const { shown } = useModalStatus(uuid)
  const modal = useModal(({ uuid }) => <LoginModal uuid={ uuid } />)

  return (
    <DrawerModal uuid={uuid} rel="Header">
      <div className={cx('menu-modal', { shown })}>
        <AccountIntro showLogin={modal.show} onCloseModal={modal.hide} />
      </div>
    </DrawerModal>
  )
}
