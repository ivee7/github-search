import React, {useContext, useEffect, Fragment} from 'react'
import {GithubContext} from '../context/github/githubContext'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router'
import {Repos} from '../components/Repos'

export const Profile = () => {
    let params = useParams();
    const {getUser, getRepos, loading, user, repos} = useContext(GithubContext)
    const urlName = params.name

    useEffect(() => {
        getUser(urlName)
        getRepos(urlName)
        // eslint-disable-next-line
    }, [])

    if (loading) {
        return <p className='text-center'>Загрузка...</p>
    }

    const {
        name, company, avatar_url,
        location, bio, blog,
        login, html_url, followers,
        following, public_repos, public_gists
    } = user
    console.log(user)
    return (
        <Fragment>
            <Link to='/' className='btn btn-link'>На главную</Link>

            <div className='card mb-4'>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-sm-3 text-center'>
                            <img
                                src={avatar_url}
                                alt={name}
                                style={{width: '150px'}}
                            />
                            <h1>{name}</h1>
                            {location && <p>Местоположение: {location}</p>}
                        </div>
                        <div className='col'>
                            {
                                bio && <Fragment>
                                    <h3>BIO</h3>
                                    <p>{bio}</p>
                                </Fragment>
                            }
                            <a
                                href={html_url}
                                target='_blank'
                                rel="noopener noreferrer"
                                className='btn btn-dark'
                            >Открыть профиль</a>
                            <ul>
                                {login && <li>
                                    <strong>Username: </strong> {login}
                                </li>}

                                {company && <li>
                                    <strong>Компания: </strong> {company}
                                </li>}

                                {blog && <li>
                                    <strong>Website: </strong> {blog}
                                </li>}
                            </ul>

                            <div className='badge btn-primary me-2'>Подписчики: {followers}</div>
                            <div className='badge btn-success me-2'>подписан: {following}</div>
                            <div className='badge btn-info me-2'>Репозитории: {public_repos}</div>
                            <div className='badge btn-dark'>Gists: {public_gists}</div>
                        </div>
                    </div>
                </div>
            </div>

            <Repos repos={repos} />
        </Fragment>
    )
}