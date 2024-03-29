const express = require('express');
// const axios = require('axios');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/check-auth');
const { check, validationResult } = require('express-validator');
// // bring in normalize to give us a proper url, regardless of what user entered
// const normalize = import('normalize-url');
// // const checkObjectId = require('../../middleware/checkObjectId');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate('user', ['name', 'avatar']);

		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
	'/',
	[
		auth,
		[
			check('status', 'Status is required').not().isEmpty(),
			check('skills', 'Skills is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// destructure the request
		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			twitter,
			instagram,
			linkedin,
			facebook,
			// spread the rest of the fields we don't need to check
		} = req.body;

		// build a profile
		const profileFields = {
			user: req.user.id,
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills: skills.split(',').map(skill => skill.trim()),
		};
		console.log(profileFields.skills);

		// Build socialFields object
		profileFields.social = { youtube, twitter, facebook, linkedin, instagram };

		//     // normalize social fields to ensure valid url
		//     for (const [key, value] of Object.entries(socialFields)) {
		//       if (value && value.length > 0)
		//         socialFields[key] = normalize(value, { forceHttps: true });
		//     }
		//     // add to profileFields
		//     profileFields.social = socialFields;

		try {
			// Using upsert option (creates new doc if no match is found):
			let profile = await Profile.findOne({ user: req.user.id });

			if (profile) {
				// Update
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);
				return res.json(profile);
			}

			// Create
			profile = new Profile(profileFields);
			await profile.save();

			return res.json(profile);
		} catch (err) {
			console.error(err.message);
			return res.status(500).send('Server Error');
		}
	}
);

// // @route   GET api/profile
// // @desc    Get all profiles
// // @access  Public
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate('user', ['name', 'avatar']);

		if (!profile) return res.status(400).json({ msg: 'Profile not found' });

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not found' });
		}
		res.status(500).json({ msg: 'Server error' });
	}
});

// @route   DELETE api/profile
// @desc    Delete profile, user and posts
// @access  Private
router.delete('/', auth, async (req, res) => {
	try {
		// Remove user posts
		await Post.deleteMany({ user: req.user.id });
		// Remove profile
		await Profile.findOneAndRemove({ user: req.user.id });
		// Remove user
		await User.findOneAndRemove({ _id: req.user.id });

		res.json({ msg: 'User deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// // @route   PUT api/profile/experience
// // @desc    Add profile experience
// // @access  Private
router.put(
	'/experience',
	[
		auth,
		[
			check('title', 'Title is required').not().isEmpty(),
			check('company', 'Company is required').not().isEmpty(),
			check('from', 'From date is required and needs to be from the past')
				.not()
				.isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { title, company, location, from, to, current, description } =
			req.body;
		const newExp = { title, company, location, from, to, current, description };

		try {
			const profile = await Profile.findOne({ user: req.user.id });

			profile.experience.unshift(newExp);

			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		const foundProfile = await Profile.findOne({ user: req.user.id });

		// Get Remove index
		const removeIndex = foundProfile.experience
			.map(item => item.id)
			.indexOf(req.params.exp_id);

		foundProfile.experience.splice(removeIndex, 1);

		await foundProfile.save();
		res.status(200).json(foundProfile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
	'/education',
	[
		auth,
		[
			check('school', 'School is required').not().isEmpty(),
			check('degree', 'Degree is required').not().isEmpty(),
			check('fieldofstudy', 'Field of study is required').not().isEmpty(),
			check('from', 'From date is required and needs to be from the past')
				.not()
				.isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { school, degree, fieldofstudy, from, to, current, description } =
			req.body;
		const newEdu = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });

			profile.education.unshift(newEdu);

			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
	try {
		const foundProfile = await Profile.findOne({ user: req.user.id });

		// Get Remove index
		const removeIndex = foundProfile.education
			.map(item => item.id)
			.indexOf(req.params.edu_id);

		foundProfile.education.splice(removeIndex, 1);

		await foundProfile.save();
		res.status(200).json(foundProfile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// // @route   GET api/profile/github/:username
// // @desc    Get GitHub repos of the user
// // @access  Public
// router.get('/github/:username', async (req, res) => {
//   try {
//     const uri = encodeURI(
//       `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
//     );
//     const headers = {
//       'user-agent': 'node.js',
//       Authorization: `token ${config.get('githubToken')}`
//     };

//     const gitHubResponse = await axios.get(uri, { headers });
//     return res.json(gitHubResponse.data);
//   } catch (err) {
//     console.error(err.message);
//     return res.status(404).json({ msg: 'No Github profile found' });
//   }
// });

router.get('/github/:username', async (req, res) => {
	try {
		const options = {
			uri: encodeURI(
				`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
			),
			method: 'GET',
			headers: {
				'user-agent': 'node.js',
				Authorization: `token ${config.get('githubSecret')}`,
			},
		};

		const gitHubResponse = await axios.get(uri, { headers });
		return res.json(gitHubResponse.data);
	} catch (err) {
		console.error(err.message);
		return res.status(404).json({ msg: 'No Github profile found' });
	}
});

module.exports = router;
