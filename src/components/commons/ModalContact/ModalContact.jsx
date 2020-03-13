import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import Input from 'components/commons/Input'
import { MdClose, MdSend } from 'react-icons/md'
import Button from 'components/commons/Button'
import Textarea from 'components/commons/Textarea'
import styles from './modalContact.scss'

const ModalContact = ({ title, icon, text, contactProtectionistEmailStore }) => {
  const [toggle, setToggle] = useState(false)
  const { t } = useTranslation()

  const handleChangeName = useCallback(e => {
    contactProtectionistEmailStore.setName(e.target.value)
  })

  const handleChangeEmail = useCallback(e => {
    contactProtectionistEmailStore.setEmail(e.target.value)
  })

  const handleChangePhone = useCallback(e => {
    contactProtectionistEmailStore.setPhone(e.target.value)
  })

  const handleChangeMessage = useCallback(e => {
    contactProtectionistEmailStore.setMessage(e.target.value)
  })

  const handleToggle = () => {
    if (toggle === false) {
      setToggle(true)
    } else {
      setToggle(false)
    }
  }

  const handleSend = useCallback(() => {
    contactProtectionistEmailStore.contactProtectionist()
    handleToggle()
  })

  return (
    <>
      <Button icon={icon} circle handleClick={handleToggle} />
      <div className={c(styles.modalCard, toggle && styles.openModal)}>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>{text}</div>
        <div className={styles.form}>
          <div className={styles.inputForm}>
            <Input
              handleChange={handleChangeName}
              type="text"
              placeholder={t('modalContact.name')}
            />
          </div>
          <div className={styles.inputForm}>
            <Input
              handleChange={handleChangePhone}
              type="number"
              placeholder={t('modalContact.phone')}
            />
          </div>
          <div className={styles.inputForm}>
            <Input
              handleChange={handleChangeEmail}
              type="email"
              placeholder={t('modalContact.email')}
            />
          </div>
          <div className={styles.inputForm}>
            <Textarea
              handleChange={handleChangeMessage}
              placeholder={t('modalContact.message')}
              cols="4"
              rows="6"
            />
          </div>
        </div>
        <div className={styles.containerButtonModals}>
          <Button
            icon={<MdSend size={25} />}
            text={t('modalContact.sendMessage')}
            handleClick={handleSend}
          />
          <Button
            icon={<MdClose size={25} />}
            text={t('modalContact.close')}
            handleClick={handleToggle}
          />
        </div>
      </div>
      <div
        onClick={() => handleToggle()}
        className={c(toggle === true ? styles.shadow : styles.displayNone)}
      />
    </>
  )
}

ModalContact.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  contactProtectionistEmailStore: PropTypes.string.isRequired,
}

export default observer(ModalContact)
