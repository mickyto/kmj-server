module.exports = function (shipit) {
    require('shipit-deploy')(shipit);

    var wd = '/root/kmj';

    shipit.initConfig({
        default: {
            workspace: '/tmp/git-monitor',
            deployTo: wd,
            repositoryUrl: 'https://github.com/mickyto/kmj-server.git',
            keepReleases: 2,
            key: '~/.ssh/id_rsa',
            branch: 'master'
        },
        staging: {
            servers: 'root@95.213.237.136'
        }
    });

    shipit.blTask('removeContainer', function () {
        return shipit.remote("if docker ps -a | grep kmj ; then docker rm -f kmj; fi")
    });

    shipit.blTask('installDependencies', function () {
        return shipit.remote('docker run --rm -v ' + wd + '/current:/usr/src/app/ -w /usr/src/app/ node:8.7.0 npm install');
    });

    shipit.blTask('startContainer', function () {
        return shipit.remote('docker run -d --name kmj -w /usr/src/app/ --link mysql -p 8080:8080 -v ' + wd + '/current:/usr/src/app/ node:8.7.0 npm start');
    });

    shipit.blTask('restartContainer', function () {
        return shipit.remote('docker restart kmj');
    });

    shipit.blTask('build', function () {
        return shipit.start('removeContainer', 'installDependencies', 'startContainer');
    });

    shipit.task('restart', function () {
        return shipit.start('restartContainer');
    });
};