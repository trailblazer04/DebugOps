import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'devops' },
      update: {},
      create: {
        name: 'DevOps',
        slug: 'devops',
        description: 'Docker, Kubernetes, CI/CD, AWS, Terraform',
        icon: 'Wrench',
        color: 'bg-blue-500',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'programming' },
      update: {},
      create: {
        name: 'Programming',
        slug: 'programming',
        description: 'Python, C, C++, and other programming languages',
        icon: 'Code',
        color: 'bg-green-500',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'cybersecurity' },
      update: {},
      create: {
        name: 'Cybersecurity',
        slug: 'cybersecurity',
        description: 'Ethical hacking, pentesting, security tools',
        icon: 'Shield',
        color: 'bg-red-500',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'linux' },
      update: {},
      create: {
        name: 'Linux',
        slug: 'linux',
        description: 'Linux system administration and troubleshooting',
        icon: 'Terminal',
        color: 'bg-purple-500',
      },
    }),
  ])

  console.log('✅ Categories created')

  // Create sample errors
  const dockerError = await prisma.error.upsert({
    where: { slug: 'docker-daemon-connection-error' },
    update: {},
    create: {
      title: "Docker: 'Cannot connect to Docker daemon' Error",
      slug: 'docker-daemon-connection-error',
      excerpt: 'Error response from daemon: Cannot connect to the Docker daemon at unix:///var/run/docker.sock',
      content: `# Problem

You're getting this error when trying to run Docker commands:

\`\`\`bash
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. 
Is the docker daemon running?
\`\`\`

## Root Cause

This error occurs when:
1. Docker daemon is not running
2. Your user doesn't have permission to access Docker
3. Docker socket is not accessible

## Solution

### Step 1: Check if Docker is running

\`\`\`bash
sudo systemctl status docker
\`\`\`

If not running, start it:

\`\`\`bash
sudo systemctl start docker
sudo systemctl enable docker
\`\`\`

### Step 2: Add user to docker group

\`\`\`bash
sudo usermod -aG docker $USER
\`\`\`

**Important**: Log out and log back in for this to take effect.

### Step 3: Verify permissions

\`\`\`bash
ls -l /var/run/docker.sock
\`\`\`

Should show:
\`\`\`
srw-rw---- 1 root docker 0 Nov 8 10:00 /var/run/docker.sock
\`\`\`

## Prevention

Add this to your \`.bashrc\` or \`.zshrc\`:

\`\`\`bash
# Start Docker on login if not running
if ! docker ps >/dev/null 2>&1; then
    echo "Starting Docker..."
    sudo systemctl start docker
fi
\`\`\`

## Related Errors

- Docker permission denied
- Docker socket not found`,
      categoryId: categories[0].id,
      subcategory: 'Docker',
      status: 'PUBLISHED',
      tags: {
        create: [
          { name: 'docker', slug: 'docker' },
          { name: 'daemon', slug: 'daemon' },
          { name: 'linux', slug: 'linux' },
        ],
      },
    },
  })

  const pythonError = await prisma.error.upsert({
    where: { slug: 'python-modulenotfounderror' },
    update: {},
    create: {
      title: 'Python: ModuleNotFoundError in Virtual Environment',
      slug: 'python-modulenotfounderror',
      excerpt: 'ModuleNotFoundError: No module named package_name even after pip install',
      content: `# Problem

You've installed a package but Python can't find it:

\`\`\`python
ModuleNotFoundError: No module named 'requests'
\`\`\`

## Root Cause

1. Package installed in different Python environment
2. Virtual environment not activated
3. Using wrong pip/python executable

## Solution

### Step 1: Verify your Python and pip

\`\`\`bash
which python
which pip
\`\`\`

They should both be in your virtual environment path.

### Step 2: Activate virtual environment

\`\`\`bash
# Linux/Mac
source venv/bin/activate

# Windows
venv\\Scripts\\activate
\`\`\`

### Step 3: Install package in correct environment

\`\`\`bash
python -m pip install requests
\`\`\`

### Step 4: Verify installation

\`\`\`bash
python -m pip list | grep requests
\`\`\`

## Prevention

Always use:
\`\`\`bash
python -m pip install package_name
\`\`\`

Instead of:
\`\`\`bash
pip install package_name
\`\`\`

This ensures you're using the correct Python environment.

## Related Errors

- ImportError: No module named
- pip command not found`,
      categoryId: categories[1].id,
      subcategory: 'Python',
      status: 'PUBLISHED',
      tags: {
        create: [
          { name: 'python', slug: 'python' },
          { name: 'pip', slug: 'pip' },
          { name: 'virtualenv', slug: 'virtualenv' },
        ],
      },
    },
  })

  const k8sError = await prisma.error.upsert({
    where: { slug: 'kubernetes-crashloopbackoff' },
    update: {},
    create: {
      title: 'Kubernetes: CrashLoopBackOff Pod Status',
      slug: 'kubernetes-crashloopbackoff',
      excerpt: 'Pod keeps restarting with CrashLoopBackOff status - debugging guide',
      content: `# Problem

Your pod shows \`CrashLoopBackOff\` status:

\`\`\`bash
NAME                     READY   STATUS             RESTARTS   AGE
myapp-5d4f8c7b9-xk2ls   0/1     CrashLoopBackOff   5          3m
\`\`\`

## Root Cause

Pod is crashing immediately after starting:
1. Application error on startup
2. Misconfigured health checks
3. Missing dependencies or environment variables
4. Incorrect container command

## Solution

### Step 1: Check pod logs

\`\`\`bash
kubectl logs myapp-5d4f8c7b9-xk2ls
# Or previous container logs
kubectl logs myapp-5d4f8c7b9-xk2ls --previous
\`\`\`

### Step 2: Describe the pod

\`\`\`bash
kubectl describe pod myapp-5d4f8c7b9-xk2ls
\`\`\`

Look for:
- Events section for errors
- Exit codes
- Liveness/Readiness probe failures

### Step 3: Common fixes

**Fix 1: Increase initial delay**
\`\`\`yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 60  # Increase this
  periodSeconds: 10
\`\`\`

**Fix 2: Check environment variables**
\`\`\`bash
kubectl exec myapp-5d4f8c7b9-xk2ls -- env
\`\`\`

**Fix 3: Debug with shell**
\`\`\`bash
kubectl run debug --rm -it --image=myapp:latest -- /bin/sh
\`\`\`

## Prevention

1. Test locally first
2. Use proper health checks
3. Add startup probes for slow-starting apps
4. Check resource limits

## Related Errors

- ImagePullBackOff
- ErrImagePull
- Pending status`,
      categoryId: categories[0].id,
      subcategory: 'Kubernetes',
      status: 'PUBLISHED',
      tags: {
        create: [
          { name: 'kubernetes', slug: 'kubernetes' },
          { name: 'pods', slug: 'pods' },
          { name: 'debugging', slug: 'debugging' },
        ],
      },
    },
  })

  console.log('✅ Sample errors created')
  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })