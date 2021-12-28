import * as express from 'express'
import MockMysql from 'mysql2/promise'
import middleware from '../middleware'
jest.mock('mysql2/promise')

